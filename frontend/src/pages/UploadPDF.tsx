import { useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

export default function UploadPDF() {
  const [documentLoading, setDocumentLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const insertPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentLoading(true);
    setError(false);
    console.log("INSERT PDF", e.target.files);
    const files = e.target.files;

    const reader = new FileReader();
    const formData = new FormData();

    formData.append("name", files[0].name);
    formData.append("file_type", files[0].name.split(".").at(-1));

    reader.onload = (evt) => {
      // Clean the Base64 string
      const base64String = (evt.target.result as string).split(",")[1];

      formData.append("file", base64String);
      axiosInstance
        .post("/api/v1/document/", formData)
        .then((res) => {
          // Whenever a new PDF is uploaded, navigate to the pdf overview page
          navigate("/documents");
          setDocumentLoading(false);
        })
        .catch((res) => {
          setError(true);
          setDocumentLoading(false);
        });
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1240px] w-[95vw] h-screen">
        <div className="flex flex-col items-center justify-center lg:w-full h-full bg-white">
          <div className="max-w-7xl max-lg:flex max-lg:justify-center">
            <label
              htmlFor="formId"
              className={`bg-gray-100 border-2 border-gray-300 relative flex flex-col items-center justify-center w-full rounded-lg p-12 text-center shadow-md ${
                !documentLoading && "hover:bg-gray-50 hover:cursor-pointer"
              } transition-all`}
            >
              {documentLoading ? (
                <>
                  <span className="w-full mt-2 text-xl font-semibold text-[#222222]">
                    Uploading your document...
                  </span>
                </>
              ) : (
                <>
                  <input
                    id="formId"
                    accept=".pptx,.pdf,.docx"
                    type="file"
                    hidden
                    onChange={insertPDF}
                  />
                  <Icon
                    icon="heroicons:document-arrow-up"
                    className="text-[#222222] h-16 w-16 gradient-text"
                  />
                  <span className="mt-2 block text-xl font-semibold text-[#222222]">
                    Click here to upload a new PDF
                  </span>
                </>
              )}
            </label>
          </div>
          {error &&
          <div className="text-red-500 text-2xl">An error has occurred Please try again.</div>}
        </div>
      </div>
    </div>
  );
}
