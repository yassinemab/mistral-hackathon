import { useState } from "react";
import Icon from "./Icon.tsx";
import {DropdownInput} from "./DropdownInput.tsx";
// import DatePicker from "react-date-picker";
// import DateTimePicker from 'react-datetime-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface HeaderMapFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDestinationChange: (destination: string) => void;
  onDateChange: (date: Date) => void;
  onVehicleChange: (vehicle: string) => void;
}
const HeaderMapForm = ({onSubmit, onDestinationChange, onDateChange, onVehicleChange}: HeaderMapFormProps) => {
  return(
    <div className="relative w-full flex justify-center py-4 items-center shadow-xl z-40">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center w-full"
      >
        <input
          type="text"
          onChange={(e) => {
            onDestinationChange(e.target.value)
          }}
          className="bg-white py-2 px-4 text-[#222222] text-md border border-gray-300 rounded-l-full outline-none"
          placeholder="Where to park?"
        />
        <input
          type="text"
          onChange={(e) => {
            onDateChange(e.target.value)
          }}
          className="bg-white py-2 px-4 text-[#222222] text-md border-y border-gray-300 outline-none"
          placeholder="Date / Time"
        />
        <input
          type="text"
          onChange={(e) => {
            onVehicleChange(e.target.value)
          }}
          className="bg-white py-2 px-4 text-[#222222] text-md border border-gray-300 rounded-r-full outline-none"
          placeholder="Vehicle"
        />
        <DropdownInput
          onChangeValue={(value) => onVehicleChange(value)}
          placeholder="Vehicle"
          classNameInput="bg-white py-2 px-4 text-[#222222] text-md border border-gray-300 rounded-r-full outline-none"
          options={[
            {value: 'Car', label: 'Car'},
            {value: 'Moto', label: 'Moto'},
            {value: 'Bike', label: 'Bike'},
          ]}
        />
        <button type="submit" className="ml-5 rounded-full p-2 bg-blue-500">
          <Icon
            icon="heroicons:magnifying-glass"
            className="text-white h-5 w-5"
          />
        </button>
      </form>
    </div>
  )
}

export default HeaderMapForm;
