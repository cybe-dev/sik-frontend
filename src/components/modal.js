import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Fragment, useImperativeHandle, useState } from "react";

const Modal = forwardRef(({ initialShown = false, title, children }, ref) => {
  const [show, setShow] = useState(initialShown);
  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    hide: () => setShow(false),
  }));

  return (
    <Fragment>
      <div
        className={
          show
            ? "bg-black fixed top-0 left-0 right-0 h-screen z-20 bg-opacity-50 block"
            : "hidden"
        }
      />
      <div
        className={
          show
            ? "fixed top-0 left-0 right-0 h-screen z-20 flex justify-center items-start p-5 overflow-auto"
            : "hidden"
        }
      >
        <div className="bg-white w-full md:w-3/4 lg:w-3/5 h-auto rounded-lg my-5">
          <div className="flex justify-between items-center p-5 rounded-t-lg shadow-sm">
            <h4 className="roboto font-bold text-lg text-gray-700">{title}</h4>
            <button
              className="w-8 h-8 flex justify-center items-center"
              type="button"
              onClick={() => setShow(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </Fragment>
  );
});

export default Modal;
