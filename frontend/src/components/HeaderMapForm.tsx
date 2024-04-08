import Icon from "./Icon.tsx";

interface HeaderMapFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDestinationChange: (destination: string) => void;
  onDateChange: (date: Date) => void;
  onVehicleChange: (vehicle: string) => void;
}
export const HeaderMapForm = ({onSubmit, onDestinationChange, onDateChange, onVehicleChange}: HeaderMapFormProps) => {
  return(
    <div className="w-full flex justify-center py-4 items-center shadow-xl">
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
