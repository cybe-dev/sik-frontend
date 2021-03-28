import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../components/button";
import DateInput from "../components/inputs/date-input";
import NumberInput from "../components/inputs/number-input";
import Textarea from "../components/inputs/textarea";
import Modal from "../components/modal";
import Table from "../components/table";
import Td from "../components/table/td";
import Th from "../components/table/th";
import { baseURL, service } from "../service";
import { useWeb } from "../web-context";
import ReactPaginate from "react-paginate";
import Dropdown from "../components/dropdown";

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

export default function Income() {
  const webContext = useWeb();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(0);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(20);
  const [activePage, setActivePage] = useState(0);
  const [month, setMonth] = useState(moment().format("M"));
  const [year, setYear] = useState(moment().format("YYYY"));
  const mounted = useRef(false);
  const modalRef = useRef(null);
  const {
    handleSubmit,
    control,
    register,
    errors,
    reset,
    setValue,
  } = useForm();

  const onSubmit = ({ actualDate, note, amount }) => {
    submitLoading();
    service({
      url: edit ? `/transaction/income/${edit}` : "/transaction/income",
      data: {
        actualDate: moment(actualDate).format("YYYY-MM-DD"),
        note,
        amount,
      },
      method: edit ? "PUT" : "POST",
    })
      .then((response) => {
        if (mounted.current) {
          getData();
          reset();
          modalRef.current.hide();
          MySwal.fire(
            "Berhasil",
            "Data telah " + (edit ? "diperbaharui" : "ditambahkan"),
            "success"
          );
        }
      })
      .catch((error) => {
        MySwal.fire(
          "Gagal",
          "Data gagal " + (edit ? "diperbaharui" : "ditambahkan"),
          "error"
        );
      });
  };

  const getData = (clearIfFail = true, updateCount = true) => {
    const offset = activePage * limit;
    setLoading(true);
    service
      .get("/transaction/income", {
        params: {
          offset,
          limit,
          month,
          year,
        },
      })
      .then((response) => {
        if (mounted.current) {
          setLoading(false);
          setCount(response.data.data.count);
          setData(response.data.data.rows);
        }
      })
      .catch((e) => {
        if (mounted.current) {
          setLoading(false);
          if (clearIfFail) {
            if (updateCount) {
              setCount(0);
            }
            setData([]);
          }
        }
      });
  };

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

  const onDelete = (id) => {
    submitLoading();
    service
      .delete(`/transaction/${id}`)
      .then((response) => {
        getData();
        MySwal.fire("Berhasil", "Data telah dihapus", "success");
      })
      .catch((error) => {
        MySwal.fire("Gagal", "Data gagal dihapus", "error");
      });
  };

  useEffect(() => {
    mounted.current = true;
    webContext.dispatch({ type: "titlePage", value: "Uang Masuk (Debet)" });
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    getData();
  }, [activePage, year, month]);
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
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 mr-auto"
              type="button"
              onClick={() => {
                if (edit) {
                  setEdit(0);
                  reset();
                }
                modalRef.current.show();
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah
            </Button>
            <Dropdown
              placeholder="Export"
              right={true}
              onClick={(item) => {
                exporting(item);
              }}
              value={[
                {
                  label: "PDF",
                  value: baseURL + `/export/income/${month}/${year}`,
                },
              ]}
              className="bg-red-600 w-24 flex justify-between"
            />
          </div>
          <div className="flex mb-3 flex-wrap">
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
              className="bg-gray-700 w-24 flex justify-between"
              onClick={(item) => setYear(item.value)}
              value={getYears()}
            />
          </div>
          <Table>
            <thead className="bg-primary-100">
              <tr>
                <Th className="w-1/6">TGL</Th>
                <Th className="w-3/6">KETERANGAN</Th>
                <Th className="w-1/6">NILAI</Th>
                <Th className="w-1/6">AKSI</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={`${index}`}>
                  <Td className="text-center">
                    {moment(item.actualDate).locale("id").format("DD-MMM-YYYY")}
                  </Td>
                  <Td>{item.note}</Td>
                  <Td className="text-right">
                    <NumberFormat
                      thousandSeparator={true}
                      prefix="Rp"
                      value={item.amount}
                      displayType="text"
                    />
                  </Td>
                  <Td className="text-center">
                    <Button
                      size="xs"
                      className="m-1 bg-yellow-500 hover:bg-yellow-600 rounded"
                      type="button"
                      onClick={() => {
                        setValue(
                          "actualDate",
                          moment(item.actualDate).toDate()
                        );
                        setValue("note", item.note);
                        setValue("amount", item.amount);
                        setEdit(item.id);
                        modalRef.current.show();
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                      size="xs"
                      className="m-1 bg-red-500 hover:bg-red-600 rounded"
                      type="button"
                      onClick={() => {
                        MySwal.fire({
                          title: "Anda yakin?",
                          html: `Anda akan menghapus transaksi ini</b>`,
                          icon: "warning",
                          showCancelButton: true,
                          cancelButtonText: "Batal",
                          confirmButtonText: "Lanjutkan",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            onDelete(item.id);
                          }
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Td>
                </tr>
              ))}
              {data.length < 1 ? (
                <tr>
                  <Td colSpan={4} className="text-center">
                    Belum ada data
                  </Td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        </Fragment>
      )}
      <ReactPaginate
        nextLabel="&raquo;"
        previousLabel="&laquo;"
        pageCount={Math.ceil(count / limit)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName="flex justify-end mt-5"
        pageClassName="text-gray-600"
        pageLinkClassName="ml-1 text-sm py-1 px-2 border border-gray-500"
        previousLinkClassName="text-gray-600 ml-1 text-sm py-1 px-2 border border-gray-500"
        nextLinkClassName="text-gray-600 ml-1 text-sm py-1 px-2 border border-gray-500"
        activeLinkClassName="bg-gray-500 text-white"
        initialPage={0}
        breakClassName="ml-2 mr-1"
        onPageChange={({ selected }) => setActivePage(selected)}
      />
      <Modal title={edit ? "Edit" : "Tambah"} ref={modalRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DateInput
            control={control}
            controllerOptions={{
              rules: {
                required: "Harap diisi",
              },
            }}
            name="actualDate"
            label="Tanggal"
            error={errors.actualDate?.message}
          />
          <NumberInput
            control={control}
            name="amount"
            label="Nilai"
            controllerOptions={{
              rules: {
                required: "Harap diisi",
              },
            }}
            allowEmptyFormatting={true}
            thousandSeparator={true}
            prefix="Rp"
            error={errors.amount?.message}
          />
          <Textarea
            label="Keterangan"
            ref={register({ required: "Harap diisi" })}
            name="note"
            error={errors.note?.message}
          />
          <div className="text-right">
            <Button
              size="sm"
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
