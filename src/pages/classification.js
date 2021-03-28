import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "../components/button";
import TextInput from "../components/inputs/text-input";
import Modal from "../components/modal";
import Table from "../components/table";
import Th from "../components/table/th";
import Td from "../components/table/td";
import { useWeb } from "../web-context";
import { service } from "../service";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const submitLoading = () =>
  MySwal.fire({
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    html: `<div class="flex flex-col justify-center items-center p-5"><div class="loader-big"/></div>`,
  });

export default function Classification() {
  const webContext = useWeb();
  const modalRef = useRef(null);
  const mounted = useRef(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(0);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, errors, setValue, reset } = useForm();

  const getData = () => {
    setLoading(true);
    service
      .get("/classification")
      .then((response) => {
        if (mounted.current) {
          setLoading(false);
          setData(response.data.data);
        }
      })
      .catch((e) => {
        if (mounted.current) {
          setLoading(false);
          setData([]);
        }
      });
  };

  const onDelete = (id) => {
    submitLoading();
    service
      .delete(`/classification/${id}`)
      .then((response) => {
        getData();
        MySwal.fire("Berhasil", "Data telah dihapus", "success");
      })
      .catch((error) => {
        MySwal.fire("Gagal", "Data gagal dihapus", "error");
      });
  };

  const onSubmit = ({ code, name }) => {
    submitLoading();
    service({
      url: edit ? `/classification/${edit}` : "/classification",
      data: {
        code,
        name,
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
        if (mounted.current) {
          MySwal.fire(
            "Gagal",
            "Data gagal " + (edit ? "diperbaharui" : "ditambahkan"),
            "error"
          );
        }
      });
  };

  useEffect(() => {
    mounted.current = true;
    webContext.dispatch({ type: "titlePage", value: "Klasifikasi" });
    getData();
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <div className="bg-white box-border p-5">
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center">
          <div className="loader-big" />
          <div className="text-lg roboto font-bold mt-3">Memuat</div>
        </div>
      ) : (
        <Fragment>
          <div className="mb-3 pb-3 border-b border-gray-300">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                if (edit) {
                  setEdit(0);
                  reset();
                }
                modalRef.current.show();
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah
            </Button>
          </div>
          <Table>
            <thead className="bg-primary-100">
              <tr>
                <Th className="w-24">KODE</Th>
                <Th className="w-96">NAMA</Th>
                <Th className="w-44">AKSI</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={`${index}`}>
                  <Td className="text-center">{item.code}</Td>
                  <Td className="text-center">{item.name}</Td>
                  <Td className="text-center">
                    <Button
                      size="xs"
                      className="bg-yellow-500 hover:bg-yellow-600 rounded"
                      type="button"
                      onClick={() => {
                        setValue("code", item.code);
                        setValue("name", item.name);
                        setEdit(item.id);
                        modalRef.current.show();
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                      size="xs"
                      className="ml-3 bg-red-500 hover:bg-red-600 rounded"
                      type="button"
                      onClick={() => {
                        MySwal.fire({
                          title: "Anda yakin?",
                          html: `Anda akan menghapus klasifikasi <b>${item.name}</b>`,
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
      <Modal title={edit ? "Edit" : "Tambah"} ref={modalRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            label="Kode"
            ref={register({ required: "Harus diisi" })}
            name="code"
            error={errors.code?.message}
          />
          <TextInput
            type="text"
            label="Nama"
            ref={register({ required: "Harus diisi" })}
            name="name"
            error={errors.name?.message}
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
