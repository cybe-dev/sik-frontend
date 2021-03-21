import { useEffect } from "react";
import Alert from "../components/alert";
import { useWeb } from "../web-context";

export default function AlertPages() {
  const webContext = useWeb();
  useEffect(() => {
    webContext.dispatch({ type: "titlePage", value: "Alert" });
  }, []);
  return (
    <div className="bg-white box-border p-5">
      <div className="text-gray-600 text-xl font-bold roboto mb-5">
        Contoh Alert
      </div>
      <Alert color="red" className="mb-3">
        Test Notifikasi Danger
      </Alert>
      <Alert color="blue" className="mb-3">
        Test Notifikasi Primary
      </Alert>
      <Alert color="yellow" className="mb-3">
        Test Notifikasi Warning
      </Alert>
      <Alert color="green" className="mb-3">
        Test Notifikasi Success
      </Alert>
      <div className="text-gray-600 text-xl font-bold roboto mt-5 mb-5">
        Contoh Alert Collapse
      </div>
      <Alert color="red" className="mb-3" collapse={true}>
        Test Notifikasi Danger
      </Alert>
      <Alert color="blue" className="mb-3" collapse={true}>
        Test Notifikasi Primary
      </Alert>
      <Alert color="yellow" className="mb-3" collapse={true}>
        Test Notifikasi Warning
      </Alert>
      <Alert color="green" className="mb-3" collapse={true}>
        Test Notifikasi Success
      </Alert>
    </div>
  );
}
