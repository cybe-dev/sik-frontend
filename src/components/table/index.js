export default function Table({ children, ...props }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto min-w-full w-max" {...props}>
        {children}
      </table>
    </div>
  );
}
