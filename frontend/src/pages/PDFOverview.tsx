import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";
import { Link } from "react-router-dom";
import { Document as PDFDocument, Page, pdfjs } from "react-pdf";
import useResizeObserver from "../hooks/useResizeObserver";

export type PDFDocument = {
  id: number;
  content: string;
  url?: string;
  title: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

export default function PDFOverview() {
  const [pdfs, setPdfs] = useState<PDFDocument[]>([{
    id: 0,
    content
  }]);

  const convertBase64ToURL = (content: string) => {
    // Convert base64 back to the PDF
    const byteCharacters = atob(content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a URL for the Blob
    const pdfURL = URL.createObjectURL(blob);
    return pdfURL;
  };

  useEffect(() => {
    axiosInstance.get("/api/v1/document/").then((res) => {
      setPdfs(
        res.data.map((pdf: PDFDocument) => {
          return {
            id: pdf.id,
            url: convertBase64ToURL(pdf.content),
            title: pdf.title,
          };
        })
      );
    });
  }, []);

  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <div className="flex justify-center mg-12 lg:mt-32" ref={containerRef}>
      <div className="max-w-[1240px] w-[95vw] ">
        <h3 className="text-3xl text-[#222222]">Your uploaded PDFs</h3>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 text-[#222222]">
          {pdfs.map((pdf) => {
            return (
              <Link
                key={pdf.id}
                to={`/documents/${pdf.id}`}
                className="p-3 rounded-xl "
              >
                <h3 className="text-2xl mb-5 font-semibold">{pdf.title}</h3>
                <PDFDocument file={pdf.url} options={options}>
                  <Fragment>
                    <Page
                      pageNumber={1}
                      width={
                        containerWidth
                          ? Math.min(containerWidth, maxWidth)
                          : maxWidth
                      }
                    />
                  </Fragment>
                </PDFDocument>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
