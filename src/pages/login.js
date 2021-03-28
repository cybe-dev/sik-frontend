import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import Button from "../components/button";
import TextInput from "../components/inputs/text-input";
import Alert from "../components/alert";
import { useWeb } from "../web-context";
import { service } from "../service";

export default function Login() {
  const webContext = useWeb();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const mounted = useRef(false);

  const onSubmit = ({ username, password }) => {
    setLoading(true);
    service
      .get("/auth/get-token", {
        params: {
          username,
          password,
        },
      })
      .then((response) => {
        if (mounted.current) setLoading(false);
        webContext.login(response.data.data.token);
        history.replace(from.pathname);
      })
      .catch((e) => {
        if (mounted.current) {
          setFailed(true);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    mounted.current = true;

    if (webContext.state.auth) {
      history.replace(from.pathname);
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <div className="bg-primary-50 w-full min-h-screen flex justify-center items-center p-5">
      <div className="bg-white w-full md:w-1/2 lg:w-3/5 flex shadow-sm">
        <div className="flex-1 bg-primary-800 justify-center items-center text-white hidden lg:flex lg:flex-col p-5">
          <span className="text-xl">Sistem Informasi Keuangan</span>
          <span className="font-bold text-xl">
            {process.env.REACT_APP_COMPANY_NAME}
          </span>
          <img src="/vector.png" className="p-5" />
        </div>
        <div className="w-full lg:w-1/2 py-12 px-8">
          <div className="text-2xl montserrat font-bold text-gray-800 mb-8 text-center">
            Login
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {failed ? (
              <Alert className="mb-3 text-center">
                Username atau password salah
              </Alert>
            ) : null}
            <TextInput
              label="Username"
              type="text"
              name="username"
              ref={register({ required: "Tidak boleh kosong" })}
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              ref={register({ required: "Tidak boleh kosong" })}
            />
            <div className="flex justify-end">
              <Button
                className="bg-primary-800 hover:bg-primary-900 w-24 flex flex-col justify-end items-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="loader-small loader-white"></div>
                ) : (
                  "Masuk"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
