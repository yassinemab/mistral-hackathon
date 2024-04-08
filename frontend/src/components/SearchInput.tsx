import { useEffect, useState } from "react";
import { Record } from "../pages/MapOverview";

export const locationIncludesQuery = (location: Record, query: string) => {

  return (
    location.city.includes(query) ||
    location.city_department.includes(query) ||
    location.country.includes(query) ||
    location.street.includes(query) ||
    location.road_name.includes(query)
  );
};

export default function SearchInput({
  records,
  onChange,
  value,
}: {
  records: Record[];
  value: string;
  onChange: (e) => void;
}) {
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);

  const [focused, setFocused] = useState<boolean>(false);

  useEffect(() => {
    if (value === "") {
      setFilteredRecords(records);
    } else {
      setFilteredRecords([
        ...records.filter((record) => locationIncludesQuery(record, value)),
      ]);
    }
  }, [value]);

  useEffect(() => {
    console.log("filtered records", filteredRecords, records);
  }, [filteredRecords]);

  return (
    <div className="relative">
      <input
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        type="text"
        onChange={onChange}
        className="bg-white p-2 px-4 text-[#222222] text-base border border-gray-300 rounded-l-full outline-none"
        placeholder="Where to park?"
      />
      {focused && (
        <div className="absolute bottom-[-100%] left-0">
          {filteredRecords.map((filteredRecord, index) => {
            return (
              <div
                className="flex items-center justify-start gap-1"
                key={index}
              >
                <span className="">
                  {filteredRecord.street}, {filteredRecord.city_department} -{" "}
                  {filteredRecord.city}{" "}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
