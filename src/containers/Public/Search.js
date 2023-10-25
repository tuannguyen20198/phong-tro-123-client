import React, {useCallback, useEffect, useState} from "react";
import {SearchItem, Modal} from "../../components";
import icons from "../../utils/icons";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {useSelector} from "react-redux";
import * as action from "../../store/action"
import { useNavigate,createSearchParams,useLocation } from "react-router-dom";
import {path} from "../../utils/constant"

const {
  BsChevronRight,
  MdOutlineHouseSiding,
  RiCrop2Line,
  TbReportMoney,
  FiSearch,
} = icons;

const Search = () => {
  const [isShowodal, setIsShowodal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const {provinces, areas, prices, categories} = useSelector(
    (state) => state.app
  );
  const [queries, setQueries] = useState({});
  const [arrMinMax,setArrMinax] = useState({});
  const [defaultText, setdefaultText] = useState('');
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) 
    {
      setArrMinax({})
      setQueries({})
    }
  },[location])

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setIsShowodal(true);
    setdefaultText(defaultText)
  };
  const handleSubmit = useCallback((e, query, arrMaxMin)=>{
    e.stopPropagation();
    setQueries(prev =>({...prev, ...query }))
    setIsShowodal(false)
    arrMaxMin && setArrMinax(prev =>({...prev,...arrMaxMin}))
  },[isShowodal,queries])

  const handleSearch = () => {
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
    let queryCodesObj = {}
    queryCodes.forEach(item => {
      queryCodesObj[item[0]] = item[1]
    })
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
    let queryTextObj = {}
    queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
    let titleSearch = `${queryTextObj.category 
      ? queryTextObj.category 
      : 'Cho thuê tất cả'} ${queryTextObj.province 
        ? `Tỉnh ${queryTextObj.province}`:
        ''} ${queryTextObj.price 
          ? `giá ${queryTextObj.price}` 
          : ''} ${queryTextObj.area 
            ? `diện tích ${queryTextObj.area}` : ''} ` 
    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(queryCodesObj).toString(),
    },{ state: { titleSearch } })
  }
  
  return (
    <>
      <div className="p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(categories, "category","Tìm tất cả")}
        >
          <SearchItem
            fontWeight
            IconBefore={<MdOutlineHouseSiding />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.category}
            defaultText = {"Tìm tất cả"}
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(provinces, "province","Toàn quốc")}
        >
          <SearchItem
            IconBefore={<HiOutlineLocationMarker />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.province} defaultText ={"Toàn quốc"}
          />
        </span>
        <span onClick={() => handleShowModal(prices, "price","Chọn giá")}>
          <SearchItem
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.price} defaultText ={"Chọn giá"}
          />
        </span>
        <span
          className="flex-1 cursor-pointer"
          onClick={() => handleShowModal(areas, "area","Chọn khu vực")}
        >
          <SearchItem
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.area} defaultText ={"Chọn khu vực"}
          />
        </span>
        <button
          type="button"
          onClick={handleSearch}
          className="outline-none py-2 px-4 flex-1 bg-secondary1 text-white rounded-md text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowodal && (
        <Modal 
          handleSubmit={handleSubmit} 
          queries={queries} 
          arrMinMax={arrMinMax} 
          content={content} 
          name={name} 
          setIsShowodal={setIsShowodal}
          defaultText={defaultText} 
        />
      )}
    </>
  );
};

export default Search;
