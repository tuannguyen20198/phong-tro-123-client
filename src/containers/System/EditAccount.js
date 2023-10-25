import React, { useState } from 'react'
import { InputReadOnly , InputFromV2, Button } from '../../components'
import anonAvatar from "../../assets/anon-avatar.png"
import { useSelector , useDispatch } from 'react-redux'
import { apiUploadImages, apiUpdateUser } from '../../services'
import validate from '../../utils/Common/validateFileds'
import { blobToBase64, fileToBase64 } from '../../utils/Common/tobase64'
import { getCurrent } from '../../store/action'
import Swal from 'sweetalert2'

const EditAccount = () => {
  const { currentData } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [payload, setPayload] = useState({
    name: currentData.name || '',
    avatar: blobToBase64(currentData?.avatar) || '',
    fbUrl: currentData?.fbUrl || '',
    zalo: currentData?.zalo || '',
  });
  
  console.log(currentData)
  const handleSubmit = async() => {
    const response = await apiUpdateUser(payload)
    if (response?.data.err === 0) {
      Swal.fire('Done','Chỉnh sửa thông tin cá nhân thành công','success').then(() => {
        dispatch(getCurrent())
      })
    }else{
      Swal.fire('Done','Chỉnh sửa thông tin cá nhân không thành công','error')
    }
  }
  const handleUploadFile = async(e) => {
    const imageBase64 = await fileToBase64(e.target.files[0])
    setPayload(prev => ({
      ...prev,
      avatar: imageBase64
    }))
  }

  return (
    <div className='flex flex-col h-full items-center'>      
      <h1 className='text-3xl w-full text-start font-medium py-4'>
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className='w-3/5 items-center justify-center flex-auto'>
        <div className='py-6 flex flex-col gap-4 w-full'>
        <InputReadOnly value={`#${currentData?.id?.match(/\d+/g)?.join('')?.slice(0, 6)}` || ''} direction = 'flex-row' label= 'Mã thành viên'/>
        <InputReadOnly value={currentData?.phone} direction = 'flex-row' editPhone label= 'Số điện thoại'
        />
        <InputFromV2
          name='name'
          setValue={setPayload}
          direction = 'flex-row'
          value={payload.name} 
          label= 'Tên hiển thị'
        />
        <InputFromV2
          name='zalo'
          setValue={setPayload}
          label= 'Zalo'
          value={payload.zalo} 
          direction = 'flex-row' 
        />
        <InputFromV2
          name='fbUrl'
          setValue={setPayload}
          label= 'Facebook'
          value={payload.fbUrl}
          direction = 'flex-row' 
        />
        <div className='flex'>
          <label className='w-[16.5%] flex-none' htmlFor="password">Mật khẩu</label>
          <small className='flex-auto h-12 text-blue-500 cursor-pointer'>Đổi mật khẩu</small>
        </div>
        <div className='flex mb-6'>
          <label className='w-[16%] flex-none' htmlFor="avatar">Ảnh đại diện</label>
          <div>
            <img src={payload?.avatar || anonAvatar} alt='avatar' className='w-28 h-28 rounded-full object-cover'/>
            <input onChange={handleUploadFile} type="file" className='appearance-none my-4' id="avatar"/>
          </div>
        </div>
        <Button 
          text='Cập nhật'
          bgColor='bg-blue-600'
          textColor='text-white'
          onClick={handleSubmit}
        />
        </div>
      </div>
    </div>
  )
}

export default EditAccount