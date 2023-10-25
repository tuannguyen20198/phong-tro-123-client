import React, { useEffect, useState } from "react";
import { Button, InputForm } from "../../components";
// import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../utils/Common/validateFileds";
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payLoad, setPayLoad] = useState({
    phone: "",
    password: "",
    name: "",
  });

  

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payLoad
      : {
          phone: payLoad.phone,
          password: payLoad.password,
        };
    let invalids = validate(finalPayload,setInvalidFields);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payLoad))
        : dispatch(actions.login(payLoad));
    }
  };

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    msg && Swal.fire("Opps !", msg, "error");
  }, [msg, update]);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm
            label={"HỌ TÊN"}
            value={payLoad.name}
            setValue={setPayLoad}
            keyPayload={"name"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <InputForm
          label={"SỐ ĐIỆN THOẠI"}
          value={payLoad.phone}
          setValue={setPayLoad}
          keyPayload={"phone"}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputForm
          label={"MẬT KHẨU"}
          value={payLoad.password}
          setValue={setPayLoad}
          keyPayload={"password"}
          type={"password"}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="mt-7 flex justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản ?{" "}
            <span
              onClick={() => {
                setIsRegister(false);
                setPayLoad({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu
            </small>
            <small
              onClick={() => {
                setIsRegister(true);
                setPayLoad({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
              className="text-[blue] hover:text-[red] cursor-pointer"
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Login;
