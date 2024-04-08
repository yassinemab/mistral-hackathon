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
    axiosInstance
      .get("/api/v1/records/")
      .then((res) => {
        setRecords([
          {
            org_name: "Mairie de Wissous",
            regulation_order: "Arrêté municipal définitif n° 16.326",
            regulation_order_created: "2006-09-13",
            regulation_order_status: "definitive",
            regulation_status: "active",
            regulation_category: "traffic regulation",
            regulation_issuing_authority: "Richard TRINQUIER, Maire de Wissous",
            regulation_start_date: "2006-09-13",
            regulation_end_date: null,
            measure_type: "vehicle restriction",
            vehicle_id: null,
            vehicle_restricted_type: "vehicles of more than 19 tonnes",
            vehicle_excempted_type:
              "vehicles of secours, d'incendie and vehicles circulating for the seuls besoins d'une mission de service public",
            road_type: "Route",
            road_name: "Route de Montjean",
            road_number: null,
            city_code: null,
            city_label: "Wissous",
            from_house_number: null,
            to_house_number: null,
            geometry: null,
            period_recurrence_type: null,
            period_start_date: null,
            period_end_date: null,
            time_slot_start_time: null,
            time_slot_end_time: null,
            day: null,
            date: null,
            country: "France",
            city: "Wissous",
            insee_code: null,
            city_department: "91",
            street: "Route de Montjean",
            construction_work: null,
          },
          {
            org_name: "Mairie de la Celle sur Morin",
            regulation_order: "ARRÊTÉ N°07.03",
            regulation_order_created: "2007-03-10",
            regulation_order_status: "Active",
            regulation_status: "Active",
            regulation_category: "Traffic Regulation",
            regulation_issuing_authority: "Mairie de la Celle sur Morin",
            regulation_start_date: "2007-03-10",
            regulation_end_date: null,
            measure_type: "Prohibition",
            vehicle_id: null,
            vehicle_restricted_type: "Poids lourds",
            vehicle_excempted_type:
              "Véhicules de services, Véhicules de livraisons",
            road_type: "Rue Chemin",
            road_name: "Rue de la Folle Emprise, Chemin des Brosses",
            road_number: null,
            city_code: null,
            city_label: "La Celle sur Morin",
            from_house_number: null,
            to_house_number: null,
            geometry: null,
            period_recurrence_type: null,
            period_start_date: null,
            period_end_date: null,
            time_slot_start_time: null,
            time_slot_end_time: null,
            day: null,
            date: null,
            country: "France",
            city: "La Celle sur Morin",
            insee_code: null,
            city_department: "Seine et Marne",
            street: "Rue de la Folle Emprise, Chemin des Brosses",
            construction_work: null,
          },
        ]);
      })
      .catch((res) => {
        setRecords([
          {
            id: 0,
            org_name: "Mairie de Wissous",
            regulation_order: "Arrêté municipal définitif n° 16.326",
            regulation_order_created: "2006-09-13",
            regulation_order_status: "definitive",
            regulation_status: "active",
            regulation_category: "traffic regulation",
            regulation_issuing_authority: "Richard TRINQUIER, Maire de Wissous",
            regulation_start_date: "2006-09-13",
            regulation_end_date: null,
            measure_type: "vehicle restriction",
            vehicle_id: null,
            vehicle_restricted_type: "vehicles of more than 19 tonnes",
            vehicle_excempted_type:
              "vehicles of secours, d'incendie and vehicles circulating for the seuls besoins d'une mission de service public",
            road_type: "Route",
            road_name: "Route de Montjean",
            road_number: null,
            city_code: null,
            city_label: "Wissous",
            from_house_number: null,
            to_house_number: null,
            geometry: null,
            period_recurrence_type: null,
            period_start_date: null,
            period_end_date: null,
            time_slot_start_time: null,
            time_slot_end_time: null,
            day: null,
            date: null,
            country: "France",
            city: "Wissous",
            insee_code: null,
            city_department: "91",
            street: "Route de Montjean",
            construction_work: null,
          },
          {
            id: 1,
            org_name: "Mairie de la Celle sur Morin",
            regulation_order: "ARRÊTÉ N°07.03",
            regulation_order_created: "2007-03-10",
            regulation_order_status: "Active",
            regulation_status: "Active",
            regulation_category: "Traffic Regulation",
            regulation_issuing_authority: "Mairie de la Celle sur Morin",
            regulation_start_date: "2007-03-10",
            regulation_end_date: null,
            measure_type: "Prohibition",
            vehicle_id: null,
            vehicle_restricted_type: "Poids lourds",
            vehicle_excempted_type:
              "Véhicules de services, Véhicules de livraisons",
            road_type: "Rue Chemin",
            road_name: "Rue de la Folle Emprise, Chemin des Brosses",
            road_number: null,
            city_code: null,
            city_label: "La Celle sur Morin",
            from_house_number: null,
            to_house_number: null,
            geometry: null,
            period_recurrence_type: null,
            period_start_date: null,
            period_end_date: null,
            time_slot_start_time: null,
            time_slot_end_time: null,
            day: null,
            date: null,
            country: "France",
            city: "La Celle sur Morin",
            insee_code: null,
            city_department: "Seine et Marne",
            street: "Rue de la Folle Emprise, Chemin des Brosses",
            construction_work: null,
          },
        ]);
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
