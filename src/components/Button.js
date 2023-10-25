import React, {memo} from "react";
const Button = ({
  text,
  textColor,
  bgColor,
  IcAfter,
  IcBefore,
  onClick,
  fullWidth,
  px,
}) => {
  return (
    <button
      type="button"
      className={`py-2 ${
        px ? px : "px-2"
      } ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1 ${fullWidth &&
        "w-full"}`}
      onClick={onClick}
    >
      {IcBefore && <span><IcBefore /></span>}
      <span className="text-center">{text}</span>
      {IcAfter && <span><IcAfter /></span>}
    </button>
  );
};

export default memo(Button);
