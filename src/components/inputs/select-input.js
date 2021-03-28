import { Controller } from "react-hook-form";
import Select from "react-select";

export default function SelectInput({
  options,
  name,
  controllerOptions,
  label,
  control,
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
          <Select
            {...props}
            onBlur={onBlur}
            value={
              options.find((predicate) => predicate.value === value) || null
            }
            onChange={(selected) => onChange(selected?.value || null)}
            options={options}
            placeholder="Pilih"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        )}
      />
      {error ? (
        <span className="text-red-700 text-small roboto">{error}</span>
      ) : null}
    </div>
  );
}
