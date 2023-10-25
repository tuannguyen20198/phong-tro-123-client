import React, {useEffect, useState} from "react";
import {Sitem} from "./index";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../store/action";
import moment from "moment";
const RelatedPost = ({newPost}) => {
  const {newPosts,outStandigPost} = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    newPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutstandingPost());
  }, []);

  useEffect(() => {
    newPost ? setPosts(newPosts) : setPosts(outStandigPost)
  }, []);
  console.log(posts)
  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">{newPost ?'Tin mới đăng':'Tin nổi bậc'}</h3>
      <div className="w-full flex flex-col gap-2">
        {posts?.map((item, index) => {
            return (
              <Sitem
                key={item.id}
                title={item.title}
                alt={item.title}
                price={item.attributes?.price}
                createdAt={moment(item.createdAt, "YYYYMMDD").fromNow()}
                image={JSON.parse(item?.images?.image)}
                star ={item.star}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedPost;
