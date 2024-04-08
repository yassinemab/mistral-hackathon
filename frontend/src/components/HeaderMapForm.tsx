import { useState } from "react";
import Icon from "./Icon.tsx";
import { DropdownInput } from "./DropdownInput.tsx";
import SearchInput from "./SearchInput.tsx";
// import DatePicker from "react-date-picker";
// import DateTimePicker from 'react-datetime-picker';

type ValuePiece = Date | null;


interface HeaderMapFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchForm: any;
  setSearchForm: any;
  records: any;
}
export const HeaderMapForm = ({
  onSubmit,
  searchForm,
  setSearchForm,
  records,
}: HeaderMapFormProps) => {
  return (
    <div className="w-full flex justify-center py-4 items-center shadow-xl">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center w-full rounded-full"
      >
        <div className="flex items-center relative rounded-full shadow-lg">
          <SearchInput
            value={searchForm.address}
            records={records}
            onChange={(e) => {
              setSearchForm({ ...searchForm, address: e.target.value });
            }}
          />

          <input
            type="text"
            onChange={(e) => {
              setSearchForm({ ...searchForm, date: e.target.value });
            }}
            className="bg-white p-3 text-[#222222] text-base font-bold border-y-2 border-gray-300 outline-none"
            placeholder="Date / Time"
          />
          <DropdownInput
            onChangeValue={(value) => {
              setSearchForm({ ...searchForm, vehicle: value });
            }}
            placeholder="Vehicle"
            classNameInput="bg-white py-2 px-4 text-[#222222] text-md border border-gray-300 rounded-r-full outline-none"
            options={[
              { value: "Car", label: "Car" },
              { value: "Moto", label: "Moto" },
              { value: "Bike", label: "Bike" },
            ]}
          />
          <button
            type="submit"
            className="-ml-[50px] rounded-full p-2 bg-pink-400"
          >
            <Icon
              icon="heroicons:magnifying-glass"
              className="text-white h-6 w-6"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
