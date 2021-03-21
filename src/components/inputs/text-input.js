const { forwardRef } = require("react");

const TextInput = forwardRef(({ label, ...props }, ref) => (
  <div className="mb-3">
    <label className="roboto text-gray-700">{label}</label>
    <input
      ref={ref}
      {...props}
      className="border border-gray-300 block rounded-none w-full my-1 p-2"
    />
  </div>
));

export default TextInput;
