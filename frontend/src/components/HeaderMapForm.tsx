import Icon from "./Icon.tsx";

interface HeaderMapFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDestinationChange: (destination: string) => void;
  onDateChange: (date: Date) => void;
  onVehicleChange: (vehicle: string) => void;
}
export const HeaderMapForm = ({onSubmit, onDestinationChange, onDateChange, onVehicleChange}: HeaderMapFormProps) => {
  return <form
    onSubmit={onSubmit}
    className="flex items-center justify-center w-full"
  >
    <input
      type="text"
      onChange={(e) => {onDestinationChange(e.target.value)}}
      className="bg-white p-3 text-[#222222] text-xl border-2 border-gray-300 rounded-l-full outline-none"
      placeholder="Where to park?"
    />
    <input
      type="text"
      onChange={(e) => {onDateChange(e.target.value)}}
      className="bg-white p-3 text-[#222222] text-xl border-y-2 border-gray-300 outline-none"
      placeholder="Date / Time"
    />
    <input
      type="text"
      onChange={(e) => {onVehicleChange(e.target.value)}}
      className="bg-white p-3 text-[#222222] text-xl border-2 border-gray-300 rounded-r-full outline-none"
      placeholder="Vehicle"
    />
    <button type="submit" className="ml-5 rounded-full p-3 bg-blue-500">
      <Icon
        icon="heroicons:magnifying-glass"
        className="text-white h-7 w-7"
      />
    </button>
  </form>
}
