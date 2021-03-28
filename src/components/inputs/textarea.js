const { forwardRef } = require("react");

const Textarea = forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-3">
    <label className="roboto text-gray-700">{label}</label>
    <textarea
      ref={ref}
      {...props}
      className="border border-gray-300 block rounded-none w-full my-1 p-2"
    ></textarea>
    {error ? (
      <span className="text-red-700 text-small roboto">{error}</span>
    ) : null}
  </div>
));

export default Textarea;
