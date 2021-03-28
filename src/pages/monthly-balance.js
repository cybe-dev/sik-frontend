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
import Modal from "../components/modal";
import Table from "../components/table";
import Td from "../components/table/td";
import Th from "../components/table/th";
import { service } from "../service";
import { useWeb } from "../web-context";
import ReactPaginate from "react-paginate";
import "moment/locale/id";

const MySwal = withReactContent(Swal);

const submitLoading = () =>
  MySwal.fire({
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    html: `<div class="flex flex-col justify-center items-center p-5"><div class="loader-big"/></div>`,
  });

export default function MonthlyBalance() {
  const webContext = useWeb();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(0);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(20);
  const [activePage, setActivePage] = useState(0);
  const mounted = useRef(false);
  const modalRef = useRef(null);
  const { handleSubmit, control, errors, reset, setValue } = useForm();

  const onSubmit = ({ actualDate, balance }) => {
    submitLoading();
    service({
      url: edit ? `/balance/${edit}` : "/balance",
      data: {
        actualDate: moment(actualDate).format("YYYY-MM-DD"),
        balance,
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
      .get("/balance", {
        params: {
          offset,
          limit,
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

  const onDelete = (id) => {
    submitLoading();
    service
      .delete(`/balance/${id}`)
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
    webContext.dispatch({ type: "titlePage", value: "Saldo Per Bulan" });
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    getData();
  }, [activePage]);
  return (
    <div className="bg-white box-border p-5 flex-1">
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center">
          <div className="loader-big" />
          <div className="text-lg roboto font-bold mt-3">Memuat</div>
        </div>
      ) : (
        <Fragment>
          <div className="mb-3 pb-3 border-b border-gray-300 flex">
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
          </div>
          <Table>
            <thead className="bg-primary-100">
              <tr>
                <Th className="w-1/6">TGL</Th>
                <Th className="w-1/6">NILAI</Th>
                <Th className="w-1/6">AKSI</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={`${index}`}>
                  <Td className="text-center">
                    {moment(item.actualDate)
                      .locale("id")
                      .format("DD MMMM YYYY")}
                  </Td>
                  <Td className="text-right">
                    <NumberFormat
                      thousandSeparator={true}
                      prefix="Rp"
                      value={item.balance}
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
                        setValue("balance", item.balance);
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
            name="balance"
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
