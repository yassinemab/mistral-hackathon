import Icon from "./Icon.tsx";
import { DropdownInput } from "./DropdownInput.tsx";
import { Record } from "../pages/MapOverview.tsx";

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
    <div className="relative z-20 w-full flex justify-center py-4 items-center shadow-lg">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center w-full rounded-full gap-2"
      >
        <div className="flex items-center relative rounded-full shadow-md">
          <DropdownInput
            onChangeValue={(value) => {
              setSearchForm({ ...searchForm, address: value });
            }}
            placeholder="Where to park?"
            classNameInput="bg-white py-2 px-4 text-[#222222] text-md border border-gray-300 rounded-l-full outline-none truncate"
            options={records.map((record: Record)=> {
              return {
                value: record.street,
                label: record.street + " " + record.city,
              }
            })}
          />

          <input
            type="text"
            onChange={(e) => {
              setSearchForm({ ...searchForm, date: e.target.value });
            }}
            className="bg-white p-2 px-4 text-[#222222] text-base border-y border-gray-300 outline-none"
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
        </div>
        <button
          type="submit"
          className="ml-[-48px] z-[1000000] rounded-full p-2 bg-pink-400"
        >
          <Icon
            icon="heroicons:magnifying-glass"
            className="text-white h-5 w-5"
          />
        </button>
      </form>
    </div>
  );
};
