const { forwardRef } = require("react");

const TextInput = forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-3">
    <label className="roboto text-gray-700">{label}</label>
    <input
      ref={ref}
      {...props}
      className="border border-gray-300 block rounded-none w-full mt-1 p-2"
    />
    {error ? (
      <span className="text-red-700 text-small roboto">{error}</span>
    ) : null}
  </div>
));

export default TextInput;
