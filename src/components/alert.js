import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Alert({
  children,
  color = "red",
  className,
  collapse = false,
}) {
  const [show, setShow] = useState(true);
  let css = "px-5 py-3";
  if (color) {
    css += ` bg-${color}-200 text-${color}-900`;
  }
  if (className) {
    css += " " + className;
  }
  if (collapse && !show) {
    css += " hidden";
  } else if (collapse) {
    css += " flex";
  }
  return (
    <div className={css}>
      {collapse ? <span className="flex-1">{children}</span> : children}
      {collapse ? (
        <button type="button" onClick={() => setShow(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : null}
    </div>
  );
}
