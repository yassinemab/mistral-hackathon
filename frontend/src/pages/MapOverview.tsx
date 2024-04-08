import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";
import MapView from "../components/MapView";
import { HeaderMapForm } from "../components/HeaderMapForm.tsx";
import { locationIncludesQuery } from "../components/SearchInput";

export type Record = {
  id: number;
  url: string;
  org_name: string;
  regulation_order: string;
  regulation_order_created: string;
  regulation_order_status: string;
  regulation_status: string;
  regulation_category: string;
  regulation_issuing_authority: string;
  regulation_start_date: Date;
  regulation_end_date: Date;
  measure_type: string;
  vehicle_id: string;
  vehicle_restricted_type: string;
  vehicle_excempted_type: string;
  road_type: string;
  road_name: string;
  road_number: string;
  city_code: string;
  city_label: string;
  from_house_number: number;
  to_house_number: number;
  geometry: string;
  period_recurrence_type: string;
  period_start_date: string;
  period_end_date: Date;
  // Actually should be a "time" field
  time_slot_start_time: string;
  // Actually should be a "time" field
  time_slot_end_time: string;
  day: string;
  date: Date;
  country: string;
  city: string;
  insee_code: string;
  city_department: string;
  street: string;
};

export default function MapOverview() {
  const [records, setRecords] = useState<Record[]>([]);

  const [searchForm, setSearchForm] = useState<{
    address: string;
    date: Date;
    vehicle: string;
  }>({
    date: new Date(),
    address: "",
    vehicle: "",
  });

  // Fetch all locations initially
  useEffect(() => {
    axiosInstance.get("/api/v1/records/").then((res) => {
      setRecords(res.data);
    });
  }, []);

  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);

  // TODO: Maybe this needs to be handled in the backend instead of frontend
  const handleSearch = () => {
    setFilteredRecords([
      ...records.filter((record) =>
        locationIncludesQuery(record, searchForm.address)
      ),
    ]);
  };

  return (
    <div className="w-full h-screen">
      <HeaderMapForm
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSearch();
        }}
        searchForm={searchForm}
        setSearchForm={setSearchForm}
        records={records}
      />
      <div className="relative z-10 w-full h-full">
        <MapView records={filteredRecords} />
      </div>
    </div>
  );
}
