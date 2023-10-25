import React from 'react'
import anonAvatar from "../../assets/anon-avatar.png"
import { useSelector,useDispatch } from "react-redux"
import menuSidebar from '../../utils/menuSidebar'
import { NavLink } from 'react-router-dom'
import * as actions from "../../store/action"
import { AiOutlineLogout } from 'react-icons/ai'
import { blobToBase64 } from '../../utils/Common/tobase64'

const activeStyle = 'hover:bg-gray-200 gap-2 rounded-md flex items-center py-2 font-bold bg-gray-200'
const noActiveStyle = 'hover:bg-gray-200 gap-2 rounded-md flex items-center py-2 cursor-pointer'

const Sidebar = () => {
  const { currentData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <div className='w-[256px] flex-none p-4 flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <img src={blobToBase64(currentData?.avatar) || anonAvatar} alt="avatar" className='w-12 h-12 object-cover rounded-full border-2 border-white'/>
          <div className='flex flex-col justify-center'>
            <span className='font-semibold'>{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span >Mã thành viên: <small className='font-medium'>{currentData?.id?.match(/\d+/g)?.join('')?.slice(0, 6)}</small></span>
      </div>
      <div>
        {menuSidebar.map(item => {
            return (
              <NavLink className={({isActive}) => isActive ? activeStyle : noActiveStyle} key={item.id} to={item?.path}
              >
                  {item?.icon}
                  {item.text}
              </NavLink>
            )
          })}
      <span onClick={() => dispatch(actions.logout())} className={noActiveStyle}>
        <AiOutlineLogout/>
        Thoát
      </span>
      </div>
    </div>
  )
}

export default Sidebar