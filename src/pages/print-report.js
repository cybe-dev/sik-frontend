import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Dropdown from "../components/dropdown";
import Table from "../components/table";
import Td from "../components/table/td";
import Th from "../components/table/th";
import { baseURL, service } from "../service";
import { useWeb } from "../web-context";

const MySwal = withReactContent(Swal);

const monthOptions = [
  {
    value: "1",
    label: "Januari",
  },
  {
    value: "2",
    label: "Februari",
  },
  {
    value: "3",
    label: "Maret",
  },
  {
    value: "4",
    label: "April",
  },
  {
    value: "5",
    label: "Mei",
  },
  {
    value: "6",
    label: "Juni",
  },
  {
    value: "7",
    label: "Juli",
  },
  {
    value: "8",
    label: "Agustus",
  },
  {
    value: "9",
    label: "September",
  },
  {
    value: "10",
    label: "Oktober",
  },
  {
    value: "11",
    label: "November",
  },
  {
    value: "12",
    label: "Desember",
  },
];

const getYears = () => {
  const temp = [];
  for (var value = parseInt(moment().format("YYYY")); value > 2000; value--) {
    temp.push({ value: `${value}`, label: `${value}` });
  }

  return temp;
};

const submitLoading = () =>
  MySwal.fire({
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    html: `<div class="flex flex-col justify-center items-center p-5"><div class="loader-big"/></div>`,
  });

export default function PrintReport() {
  const webContext = useWeb();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(moment().format("M"));
  const [year, setYear] = useState(moment().format("YYYY"));
  const mounted = useRef(false);
  const [total, setTotal] = useState(0);

  const exporting = (item) => {
    submitLoading();
    service
      .get(item.value)
      .then((response) => {
        MySwal.close();
        window.open(baseURL + response.data.data, "_blank");
      })
      .catch((error) => {
        MySwal.fire("Gagal", "Laporan tidak terekspor", "error");
      });
  };

  const getData = () => {
    setLoading(true);
    service
      .get("/recap", {
        params: {
          month,
          year,
        },
      })
      .then((response) => {
        if (mounted.current) {
          const data = response.data.data;
          setLoading(false);
          setData(data);
          let total = 0;
          for (const item of data) {
            total = total + parseInt(item.total_amount || 0);
          }
          setTotal(total);
        }
      })
      .catch((e) => {
        if (mounted.current) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    mounted.current = true;
    webContext.dispatch({ type: "titlePage", value: "Cetak Laporan" });

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    getData();
  }, [month, year]);
  return (
    <div className="bg-white box-border p-5 flex-1">
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center">
          <div className="loader-big" />
          <div className="text-lg roboto font-bold mt-3">Memuat</div>
        </div>
      ) : (
        <Fragment>
          <div className="mb-3 pb-3 border-b border-gray-300 flex flex-wrap">
            <Dropdown
              selected={monthOptions.findIndex(
                (predicate) => predicate.value === month
              )}
              className="bg-gray-700 w-32 flex justify-between mr-2 mb-1"
              onClick={(item) => setMonth(item.value)}
              value={monthOptions}
            />
            <Dropdown
              selected={getYears().findIndex(
                (predicate) => predicate.value === year
              )}
              className="bg-gray-700 w-24 flex justify-between mr-2 mb-1"
              onClick={(item) => setYear(item.value)}
              value={getYears()}
            />
            <Dropdown
              placeholder="Export Rekap"
              value={[
                {
                  label: "PDF",
                  value: baseURL + `/export/recap/${month}/${year}`,
                },
              ]}
              onClick={(item) => exporting(item)}
              className="bg-red-600 flex justify-between mr-2 mb-1"
            />
            <Dropdown
              placeholder="Export Buku Besar"
              value={[
                {
                  label: "PDF",
                  value: baseURL + `/export/ledger/${month}/${year}`,
                },
              ]}
              onClick={(item) => exporting(item)}
              className="bg-red-600 flex justify-between"
            />
          </div>
          <div className="mb-3 pb-3 border-b border-gray-300 font-bold roboto lg:text-lg text-gray-700">
            REKAPITULASI PENGELUARAN{" "}
            {monthOptions[month - 1].label.toUpperCase()} {year}
          </div>
          <Table>
            <thead className="bg-primary-100">
              <tr>
                <Th>KODE</Th>
                <Th>KETERANGAN</Th>
                <Th>NILAI (Rp)</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={`${index}`}>
                  <Td className="text-center">{item.code}</Td>
                  <Td>{item.name}</Td>
                  <Td className="text-right">
                    <NumberFormat
                      thousandSeparator={true}
                      prefix="Rp"
                      value={item.total_amount || 0}
                      displayType="text"
                    />
                  </Td>
                </tr>
              ))}
              <tr>
                <Td colSpan={2} className="text-center">
                  TOTAL
                </Td>
                <Td className="text-right">
                  <NumberFormat
                    thousandSeparator={true}
                    prefix="Rp"
                    value={total || 0}
                    displayType="text"
                  />
                </Td>
              </tr>
            </tbody>
          </Table>
        </Fragment>
      )}
    </div>
  );
}
