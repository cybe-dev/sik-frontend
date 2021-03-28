import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "./button";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function Dropdown({
  className,
  value = [],
  selected = -1,
  onClick,
  placeholder = "",
  right = false,
}) {
  const [showed, setShowed] = useState(false);
  let css = "inline-block relative";
  let listContainerCss = "w-56 bg-white shadow-lg py-3 max-h-64 overflow-auto";
  if (showed) {
    listContainerCss += " block";
  } else {
    listContainerCss += " hidden";
  }
  return (
    <div className={css}>
      <Button
        type="button"
        className={className}
        size="sm"
        onClick={() => setShowed((value) => !value)}
      >
        <span>
          {value[selected]?.selectedLabel ||
            value[selected]?.label ||
            placeholder}
        </span>
        <span className="inline-block ml-2">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </Button>
      <div className={right ? "absolute z-20 right-0" : "absolute z-20 left-0"}>
        <OverlayScrollbarsComponent
          className={listContainerCss}
          options={{ scrollbars: { autoHide: "scroll" } }}
        >
          {value.map((item, index) => (
            <a
              key={`${index}`}
              href="#"
              className="block py-2 px-5 roboto text-gray-600 hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault();
                onClick(item);
                setShowed(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}
