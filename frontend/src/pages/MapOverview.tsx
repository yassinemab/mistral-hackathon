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
  regulation_start_date: string;
  regulation_end_date: string;
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
  period_end_date: string;
  // Actually should be a "time" field
  time_slot_start_time: string;
  // Actually should be a "time" field
  time_slot_end_time: string;
  day: string;
  date: string;
  country: string;
  city: string;
  insee_code: string;
  city_department: string;
  street: string;
};

const locationContainsDate = (record: Record, date: string) => {
  return (
    date === "" ||
    (date < record.period_end_date && date > record.period_start_date)
  );
};

const locationContainsVehicle = (record: Record, vehicle: string) => {
  return vehicle === "" || record.vehicle_excempted_type.includes(vehicle);
};

export default function MapOverview() {
  const [records, setRecords] = useState<Record[]>([]);

  const [searchForm, setSearchForm] = useState<{
    address: string;
    date: string;
    vehicle: string;
  }>({
    date: "",
    address: "",
    vehicle: "",
  });

  // Fetch all locations initially
  useEffect(() => {
    axiosInstance.get("/api/v1/get_data/").then((res) => {
      setRecords(res.data);
    });
  }, []);

  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);

  useEffect(() => {
    setFilteredRecords(records);
  }, []);

  const handleSearch = () => {
    setFilteredRecords([
      ...records.filter(
        (record) =>
          locationIncludesQuery(record, searchForm.address) &&
          locationContainsDate(record, searchForm.date) &&
          locationContainsVehicle(record, searchForm.vehicle)
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
