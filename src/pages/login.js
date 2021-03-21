import { useHistory } from "react-router";
import Button from "../components/button";
import TextInput from "../components/inputs/text-input";
import { useWeb } from "../web-context";

export default function Login() {
  const webContext = useWeb();

  const history = useHistory();

  return (
    <div className="bg-primary-50 w-full min-h-screen flex justify-center items-center p-5">
      <div className="bg-white w-full md:w-1/2 lg:w-3/5 flex shadow-sm">
        <div className="flex-1 bg-primary-800 justify-center items-center text-white hidden lg:flex">
          <span className="font-bold text-xl">Your Logo</span>
        </div>
        <div className="w-full lg:w-1/2 py-12 px-8">
          <div className="text-2xl montserrat font-bold text-gray-800 mb-5 text-center">
            Admin Panel
          </div>
          <form>
            <TextInput label="Username" type="text" />
            <TextInput label="Password" type="password" />
            <div className="text-right">
              <Button
                className="bg-primary-800 hover:bg-primary-900"
                onClick={() => {
                  webContext.dispatch({ type: "auth", value: true });
                  history.push("/");
                }}
                type="button"
              >
                Masuk
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
