import React from "react";
import ProvinceBtn from "./ProvinceBtn";
import { location } from "../utils/constant";

const Province = () => {
  return (
    <div className="flex items-center justify-center gap-5 py-5">
      {location.map((item) => {
        return (
          <ProvinceBtn 
            key={item.id} 
            image={item.image} 
            name={item.name}
            provinceCode={item.provinceCode} 
          />
        );
      })}
    </div>
  );
};

export default Province;
