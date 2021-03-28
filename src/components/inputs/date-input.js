import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({
  control,
  name,
  label,
  controllerOptions = {},
  error,
  ...props
}) {
  return (
    <div className="mb-3 flex flex-col">
      <label className="roboto text-gray-700 block">{label}</label>
      <Controller
        {...controllerOptions}
        control={control}
        name={name}
        render={({ onChange, onBlur, value }) => (
          <ReactDatePicker
            {...props}
            selected={value}
            onChange={(date) => onChange(date)}
            onBlur={onBlur}
            dateFormat="dd/MM/yyyy"
            className="border border-gray-300 block rounded-none w-full mt-1 p-2"
          />
        )}
      />
      {error ? (
        <span className="text-red-700 text-small roboto">{error}</span>
      ) : null}
    </div>
  );
}
