import React ,{useEffect, useState} from 'react'
import {useDispatch , useSelector} from "react-redux"
import * as actions from "../../store/action"
import moment from "moment";
import {Button, UpdatePost} from "../../components"
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';


const ManagePost = () => {

  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false);
  const {potsOfCurrent,dataEdit} = useSelector(state => state.post)
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('0');
  
  
  
  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin())
  },[dataEdit,updateData])

  useEffect(() => {
    setPosts(potsOfCurrent)
  },[potsOfCurrent])

  useEffect(() => {
    !dataEdit && setIsEdit(false) 
  },[dataEdit])
  const checkStatus = (dateString) => moment(dateString,process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())
  const handleDeletePost = async(postId) => {
    const response = await apiDeletePost(postId)
    if (response?.data.err === 0) {
      setUpdateData(prev => !prev)
    }else{
      Swal.fire('Oop!','Xóa tin đăng thất bại','error')
    }
  }
  useEffect(() => {
    if (status === 1) {
      const activePost = potsOfCurrent?.filter(item => checkStatus(item?.overviews?.expire?.split(' ')[3]))
      setPosts(activePost)
    }else  if (status === 2){
      const expiredPost = potsOfCurrent?.filter(item => !checkStatus(item?.overviews?.expire?.split(' ')[3]))
      setPosts(expiredPost)
    }else{
      setPosts(potsOfCurrent)
    }
  },[status])
  
  return (
    <div className='flex flex-col gap-6'>
        <div className='py-4 border-b border-gray-200 flex items-center justify-between'>
            <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
            <select onChange={e => setStatus(+e.target.value)} value = {status} className='outline-none border p-2 border-gray-200 rounded-md'>
                <option value="0">Lọc theo trạng thái</option>
                <option value="1">Đang hoạt động</option>
                <option value="2">Đã hết hạn</option>
            </select>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className='flex w-full bg-gray-100'>
              <th className='border flex-1 p-2'>Mã Tin</th>
              <th className='border flex-1 p-2'>Ảnh đại diện</th>
              <th className='border flex-1 p-2'>Tiêu đề</th>
              <th className='border flex-1 p-2'>Giá</th>
              <th className='border flex-1 p-2'>Ngày bắt đầu</th>
              <th className='border flex-1 p-2'>Ngày hết hẹn</th>
              <th className='border flex-1 p-2'>Trạng thái</th>
              <th className='border flex-1 p-2'>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {!posts 
              ? <tr>
                  <td>aahaha</td>
                </tr>:posts?.map(item => {
                  return(
                    <tr className='flex items-center h-16' key={item.id}>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.overviews?.code}</td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                        <img src={JSON.parse(item?.images?.image)[0] || ''} alt="avatar-post" className='w-10 h-10 object-cover rounded-md'/>
                      </td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>{`${item?.title?.slice(0,40)}...`}</td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.attributes?.price}</td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.overviews?.created}</td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>{item?.overviews?.expire}</td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center'>
                        {checkStatus(item?.overviews?.expire?.split(' ')[3]) ? 'Đang hoạt động' : 'Đã hết hẹn'}
                      </td>
                      <td className='border px-2 flex-1 h-full flex items-center justify-center gap-2'>
                        <Button 
                          text='Sửa' 
                          bgColor='bg-green-600' 
                          textColor="text-white"
                          onClick={()=> {
                            dispatch(actions.editData(item))
                            setIsEdit(true)
                          }}
                        />
                        <Button 
                          text='Xóa'
                          bgColor='bg-orange-600' 
                          textColor="text-white"
                          onClick={() => handleDeletePost(item.id)}
                        />
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
        {isEdit && <UpdatePost setIsEdit={setIsEdit}/>}
    </div>
  )
}

export default ManagePost