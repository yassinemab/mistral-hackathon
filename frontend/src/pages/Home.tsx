import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen gap-3 text-3xl">
      <Link className="text-white hover:text-gray-200 transition-all" to="/documents/upload">Upload a PDF</Link>
      <Link className="text-white hover:text-gray-200 transition-all" to="/documents">PDF overview</Link>
      <Link className="text-white hover:text-gray-200 transition-all" to="/geolocation">Geolocation page</Link>
    </div>
  );
}
