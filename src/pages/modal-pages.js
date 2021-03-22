import { useEffect, useRef } from "react";
import Button from "../components/button";
import Modal from "../components/modal";
import { useWeb } from "../web-context";

export default function ModalPages() {
  const webContext = useWeb();
  const modalRef = useRef(null);
  useEffect(() => {
    webContext.dispatch({ type: "titlePage", value: "Modal" });
  }, []);
  return (
    <>
      <div className="bg-white box-border p-5">
        <Button
          type="button"
          className="bg-red-600 hover:bg-red-700"
          onClick={() => {
            modalRef.current.show();
          }}
        >
          Show
        </Button>
      </div>
      <Modal ref={modalRef} title="Contoh Modal">
        Testing
      </Modal>
    </>
  );
}
