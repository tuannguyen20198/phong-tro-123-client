import React, {useEffect, useState} from "react";
import {Button, Item} from "../../components";
import {getPostsLimit} from "../../store/action/post";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

const List = ({categoryCode}) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {posts} = useSelector((state) => state.post);
  const [sort, setSort] = useState(0)
  console.log(posts)
  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    console.log("params",params)
    let searchParamsObject = {};
    for(let i = 0 ; i < 0 ;i++){

    }
    console.log("searchParamsObject",searchParamsObject)
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
        searchParamsObject[i[0]] = [searchParamsObject[i[0]], i[1]]
      }else{
        searchParamsObject = {...searchParamsObject,[i[0]] : i[1]}
      }
    })
    // params?.forEach(i => {
    //   if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
    //       let priceNew = i[1]
    //       let key = i[0]
    //       let price = searchParamsObject[key]
    //       searchParamsObject[key] = [price, priceNew]
    //   } else {
    //       searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] }
    //   }
    // })
    console.log("searchParamsObject",searchParamsObject)
    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    if (sort === 1) searchParamsObject.order = ['createdAt','DESC']
    dispatch(getPostsLimit(searchParamsObject));
  }, [searchParams, categoryCode,sort]);
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 25/08/2022</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp:</span>
        <span onClick={() => setSort(0)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`}>Măt định</span>
        <span onClick={() => setSort(1)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`}>Mới nhất</span>
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
