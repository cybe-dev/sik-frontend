import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

export default function NumberInput({
  control,
  name,
  label,
  controllerOptions = {},
  error,
  ...props
}) {
  return (
    <div className="mb-3">
      <label className="roboto text-gray-700">{label}</label>
      <Controller
        {...controllerOptions}
        control={control}
        name={name}
        render={({ onChange, onBlur, value }) => (
          <NumberFormat
            {...props}
            className="border border-gray-300 block rounded-none w-full mt-1 p-2"
            onValueChange={({ value }) => onChange(value)}
            value={value || ""}
            onBlur={onBlur}
          />
        )}
      />
      {error ? (
        <span className="text-red-700 text-small roboto">{error}</span>
      ) : null}
    </div>
  );
}
