import { Document as PDFDocument, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";

import useResizeObserver from "../hooks/useResizeObserver";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";
import { Record } from "./MapOverview";
import Icon from "../components/Icon";
import { Link } from "react-router-dom";
import MapView from "../components/MapView";

const resizeObserverOptions = {};

const maxWidth = 800;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export default function RecordDetailPage() {
  const id = Number(window.location.href.split("/").at(-1));

  const [containerWidth, setContainerWidth] = useState<number>();

  const [numPages, setNumPages] = useState<number>();

  const containerRef = useRef(null);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const [record, setRecord] = useState<Record | null>(null);

  useEffect(() => {
    axiosInstance.get(`/api/v1/get_data_detail/?id=${id}`).then((res) => {
      setRecord(res.data.record);
    });
  }, []);

  return (
    <div className="flex h-screen bg-white w-full" ref={containerRef}>
      {record && (
        <>
          <div className="w-[50%] h-full">
            {/* Display pdf */}
            <PDFDocument
              file={record.url}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Fragment key={index}>
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={
                      containerWidth
                        ? Math.min(containerWidth, maxWidth)
                        : maxWidth
                    }
                  />
                </Fragment>
              ))}
            </PDFDocument>
          </div>
          <div className="relative w-[50%] h-full flex justify-center">
            <Link
              to="/documents"
              className="absolute top-[20px] left-[20px] bg-gray-200 p-3"
            >
              <Icon
                icon="heroicons:arrow-left"
                className=" text-[#222222] h-8 w-8"
              />
            </Link>
            <div className="w-[80%]">
              <h3 className="text-2xl text-[#222222]">General details</h3>
              <div className="grid grid-cols-3 w-full">
                <div className="">
                  <label>Road</label>
                  <p>{record?.road_name}</p>
                </div>
                <div>
                  <label>Street</label>
                  <p>{record?.street}</p>
                </div>
                <div>
                  <label>House numbers</label>
                  <p>
                    {record?.from_house_number} - {record?.to_house_number}
                  </p>
                </div>
                <div>
                  <label>City department</label>
                  <p>
                    {record?.city_department}, {record?.city}
                  </p>
                </div>
                <div>
                  <label>Country</label>
                  <p>{record?.country}</p>
                </div>
                <div>
                  <label>Times</label>
                  <p>
                    {record?.time_slot_start_time} -{" "}
                    {record?.time_slot_end_time}
                  </p>
                </div>
              </div>
              <h2 className="text-2xl text-[#222222]">Vehicles</h2>
              <div className="mt-7 grid grid-cols-2">
                <div>
                  <label>Accepted vehicles</label>
                  <p>{record?.vehicle_excempted_type}</p>
                </div>
                <div>
                  <label>Restricted vehicles</label>
                  <p>{record?.vehicle_restricted_type}</p>
                </div>
              </div>
              <h2 className="text-2xl text-[#222222]">Regulation</h2>
              <div className="mt-7 grid grid-cols-3">
                <div>
                  <label>Measure</label>
                  <p>{record?.measure_type}</p>
                </div>
                <div>
                  <label>Dates</label>
                  <p>
                    {record?.regulation_start_date} -{" "}
                    {record?.regulation_end_date}
                  </p>
                </div>
                <div>
                  <label>Regulation category</label>
                  <p>{record?.regulation_category}</p>
                </div>
              </div>
              <div className="w-full h-[400px]">
                <MapView records={[record]} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
