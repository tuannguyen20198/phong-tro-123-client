import React, { useCallback,useEffect,useRef,useState } from "react";
import logo from "../../assets/logowithoutbg.png";
import { Button, User } from "../../components";
import icons from "../../utils/icons";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/action/auth";
import { path } from "../../utils/constant";
import menuManage from "../../utils/menuManage";
const { AiOutlinePlusCircle,AiOutlineLogout,BsChevronDown } = icons;

const Header = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef()
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector(state => state.user)
  const [isShowMenu, setIsShowMenu] = useState(false);
  

  useEffect(() => {
    headerRef.current.scrollIntoView({behavior:'smooth',block:'start'})
  },[searchParams.get("page")])
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  return (
    <div ref={headerRef} className="w-3/5">
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <small>Phongtro123.com xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLoggedIn && 
            <div className="flex items-center gap-3 relative">
              <User/>
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-secondary1"
                px="px-4"
                onClick={()=>setIsShowMenu(prev => !prev)}
                IcAfter={BsChevronDown}
              />
              {isShowMenu && <div className="absolute top-full min-w-200 right-0 bg-white shadow-md rounded-md p-4 flex flex-col">
                {menuManage.map(item => {
                  return (
                    <Link className="hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2 flex items-center gap-2" key={item.id} to={item?.path}
                    >
                        {item?.icon}
                        {item.text}
                    </Link>
                  )
                })}
                  <span className="cursor-pointer hover:text-orange-500 text-blue-600 border-gray-200 py-2 flex items-center gap-2" onClick={() => 
                    {
                      dispatch(action.logout())
                      setIsShowMenu(false)
                    }
                  }>
                  <AiOutlineLogout/>
                  Đăng xuất
                </span>
              </div>}
            </div>}
            <Button
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-secondary2"
              IcAfter={AiOutlinePlusCircle}
              onClick={() => navigate('/he-thong/tao-moi-tin-dang')}
            />
        </div>
      </div>
    </div>
  );
};

export default Header;
