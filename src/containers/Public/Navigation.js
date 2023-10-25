import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../utils/Common/formatVietnameseToString";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/action"
import {path} from "../../utils/constant"

const nav = [
  { name: "Trang chủ", path: "home" },
  { name: "Cho thuê phòng trọ", path: "cho-thue-phong-tro" },
  { name: "Nhà Cho Thuê", path: "nha-cho-thue" },
  { name: "Cho thuê căn hộ", path: "cho-thue-can-ho" },
  { name: "Cho thuê mặt bằng", path: "cho-thue-mat-bang" },
];
const notActive =
  "hover:bg-secondary2 h-full flex justify-center items-center py-2 px-4";
const active =
  "hover:bg-secondary2 h-full flex justify-center items-center py-2 px-4 bg-secondary2";
const Navigation = ({isAdmin}) => {
  // const [categories, setCategories] = useState([]) 
  const {categories} = useSelector(state => state.app)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  return (
    <div className={`w-full flex ${isAdmin ? "justify-start":"justify-center"} items-center h-[40px] bg-secondary1 text-white`}>
      <div className="w-3/5 flex h-full items-center text-sm font-medium">
        <NavLink
          to={`/`}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item, index) => {
            return (
              <div
                key={item.code}
                className="h-full flex justify-center items-center"
              >
                <NavLink
                  to={`/${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
          <NavLink
          to={path.CONTACT}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
