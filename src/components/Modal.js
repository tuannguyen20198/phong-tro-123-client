import React, {useState, useEffect, memo} from "react";
import icons from "../utils/icons";
import { getNumbersPrice,getNumbersArea } from "../utils/Common/getNumbers";
import { getCodes,getCodesArea } from "../utils/Common/getCodes";

const {GrLinkPrevious} = icons;
const Modal = ({ setIsShowodal, content, name, handleSubmit, queries, arrMinMax,defaultText }) => {
  const [persent1, setPersent1] = useState(name === "price" && arrMinMax?.priceArr ? arrMinMax?.priceArr[0] : name === "area" && arrMinMax?.areaArr ? arrMinMax?.areaArr[0] : 0);
  const [persent2, setPersent2] = useState(name === "price" && arrMinMax?.priceArr ? arrMinMax?.priceArr[1] : name === "area" && arrMinMax?.areaArr ? arrMinMax?.areaArr[1] :100);
  const [activedEl, setActivedEl] = useState("");

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (persent2 <= persent1) {
      activedTrackEl.style.left = `${persent2}%`;
      activedTrackEl.style.right = `${100 - persent1}%`;
    } else {
      activedTrackEl.style.left = `${persent1}%`;
      activedTrackEl.style.right = `${100 - persent2}%`;
    }
    }
  },[persent1,persent2]);
  const handleClickStack = (e, value) => {
    e.stopPropagation();
    const strackEl = document.getElementById("track");
    const strackRect = strackEl.getBoundingClientRect();
    let percent = value
      ? value
      : Math.round(((e.clientX - strackRect.left) * 100) / strackRect.width, 0);
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setPersent1(percent);
    } else {
      setPersent2(percent);
    }
  };
  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round((percent * 0.9)) / 5) * 5
      : 0;
  };
  const convertto100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setActivedEl(code);
    let arrMaxMin = name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMaxMin?.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPersent1(0);
        setPersent2(convertto100(1));
      }
      if (arrMaxMin[0] === 20) {
        setPersent1(0);
        setPersent2(convertto100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPersent1(100);
        setPersent2(100);
      }
    }
    if (arrMaxMin?.length === 2) {
      setPersent1(convertto100(arrMaxMin[0]));
      setPersent2(convertto100(arrMaxMin[1]));
    }
  };

  const handleBeforeSubmit = (e) => {
    let min = persent1 <= persent2 ? persent1 : persent2
    let max = persent1 <= persent2 ? persent2 : persent1
    let arrMinMax = (persent1 === persent2 && persent1 === 100) ? [convert100toTarget(min),99999] : [convert100toTarget(min),convert100toTarget(max)] 
    console.log(arrMinMax)
    handleSubmit(e,{
      [`${name}Number`]: arrMinMax,
      [name]: `Từ ${convert100toTarget(min)}${(persent1 === persent2 && persent1 === 100) 
        ? ''
        : ` - ${convert100toTarget(max)}`} ${name === 'price' ? 'triệu' : 'm2'} ${(persent1 === persent2 && persent1 === 100) ? 'trở lên' : ''}`
    },{
      [`${name}Arr`] : [min,max]
    })
  }
  

  return (
    <div
      onClick={() => {
        setIsShowodal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowodal(true);
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-100">
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowodal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col">
            <span className="py-2 flex gap-2 items-center border-b border-gray-200"
            >
              <input
                type="radio"
                name={name}
                value={defaultText || ''}
                id="default"
                checked={!queries[`${name}Code`] ? true : false}
                onClick={(e) => handleSubmit(e,{[name]:defaultText,[`${name}Code`]: null})}
                readOnly
              />
              <label htmlFor='default'>{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={item.code === queries[`${name}Code`] ? true : false}
                    onClick={(e) => handleSubmit(e,{[name]:item.value,[`${name}Code`]: item.code})}
                    readOnly
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className="p-12 py-20">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                {(persent1 === 100 && persent2 === 100) 
                ? `Trên ${convert100toTarget(persent1)} ${name === "price" ? "triệu" : "m2"} +` 
                : `Từ ${
                  persent1 <= persent2
                    ? convert100toTarget(persent1)
                    : convert100toTarget(persent2)
                } - ${
                  persent2 >= persent1
                    ? convert100toTarget(persent2)
                    : convert100toTarget(persent1)
                } ${name === "price"
                    ? "triệu"
                    : "m2"}`}
              </div>
              <div
                onClick={handleClickStack}
                id="track"
                className="slider-track absolute top-0 bottom-0 w-full h-[5px] bg-gray-300 rounded-full"
              ></div>
              <div
                onClick={handleClickStack}
                id="track-active"
                className="slider-track absolute top-0 bottom-0 h-[5px] bg-orange-600 rounded-full"
              ></div>
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                value={persent1}
                onChange={(e) => {
                  setPersent1(+e.target.value);
                  activedEl && setActivedEl("");
                }}
              />
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                value={persent2}
                onChange={(e) => {
                  setPersent2(+e.target.value);
                  activedEl && setActivedEl("");
                }}
              />
              <div className="absolute z-30 top-6 left-0 right-0 flex items-center justify-between">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStack(e, 100);
                  }}
                >
                  {name === "prices"
                    ? "15 triệu +"
                    : name === "area"
                    ? "Trên 90m2"
                    : ""}
                </span>
              </div>
            </div>
            <div className="mt-24">
              <h4 className="font-medium mb-4">Chọn nhanh:</h4>
              <div className="flex gap-2 items-center flex-wrap w-full">
                {content?.map((item) => {
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleActive(item.code, item.value)}
                      className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                        item.code === activedEl ? "bg-orange-500 text-white" : ""
                      }`}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(name === "price" || name === "area") && <button
          type="button"
          className="w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md uppercase"
          onClick={handleBeforeSubmit}
        >
          Áp dụng
        </button>}
      </div>
    </div>
  );
};

export default memo(Modal);
