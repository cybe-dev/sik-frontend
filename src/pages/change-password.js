import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "../components/button";
import TextInput from "../components/inputs/text-input";
import { service } from "../service";
import { useWeb } from "../web-context";

const MySwal = withReactContent(Swal);

const submitLoading = () =>
  MySwal.fire({
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    html: `<div class="flex flex-col justify-center items-center p-5"><div class="loader-big"/></div>`,
  });

export default function ChangePassword() {
  const webContext = useWeb();
  const { register, handleSubmit, errors, reset, watch } = useForm();
  const mounted = useRef(false);

  const onSubmit = ({ oldPassword, newPassword, confirmNewPassword }) => {
    submitLoading();
    service
      .put("/auth/change-password", {
        oldPassword,
        newPassword,
      })
      .then((response) => {
        if (mounted.current) {
          reset();
          MySwal.fire("Berhasil", "Password telah diganti", "success");
        }
      })
      .catch((e) => {
        if (mounted.current) {
          MySwal.fire("Gagal", "Password gagal diganti", "error");
        }
      });
  };

  useEffect(() => {
    mounted.current = true;
    webContext.dispatch({ type: "titlePage", value: "Ganti Password" });
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <div className="bg-white box-border p-5">
      <form className="lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="password"
          label="Password Lama"
          ref={register({ required: "Harap diisi" })}
          name="oldPassword"
          error={errors.oldPassword?.message}
        />
        <TextInput
          type="password"
          label="Password Baru"
          ref={register({ required: "Harap diisi" })}
          name="newPassword"
          error={errors.newPassword?.message}
        />
        <TextInput
          type="password"
          label="Konfirmasi Password Baru"
          ref={register({
            required: "Harap diisi",
            validate: (value) =>
              value === watch("newPassword") ||
              "Konfirmasi password baru dengan benar",
          })}
          name="confirmNewPassword"
          error={errors.confirmNewPassword?.message}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          type="submit"
          size="sm"
        >
          Simpan
        </Button>
      </form>
    </div>
  );
}
