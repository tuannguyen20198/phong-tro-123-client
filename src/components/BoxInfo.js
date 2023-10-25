import React, { memo } from 'react'
import  anonAvartar from "../assets/anon-avatar.png"
import icons from '../utils/icons'
import Button from './Button'
import { Link } from 'react-router-dom'

const {BsDot,BsTelephoneFill,SiZalo} = icons

const BoxInfo = ({userData}) => {
  return (
    <div className='w-full bg-yellow-600 rounded-md flex flex-col items-center p-4 gap-4'>
        <img src={anonAvartar} alt="avatar" className='w-16 h-16 object-contain rounded-full'/>
        <h3 className='font-medium text-xl'>{userData?.name}</h3>
        <span className='flex items-center gap-2'>
            <BsDot color ='green' size={28}/>
            <span>Đang hoạt động</span>
        </span>
        <Link className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg' href=''><BsTelephoneFill/>{userData?.phone}</Link>
        <Link to={`https://zalo.me/${userData?.zalo}`} className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md text-black font-bold text-lg' href=''><SiZalo size={30} color='blue'/></Link>
        
    </div>
  )
}

export default memo(BoxInfo)