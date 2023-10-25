import React, { memo } from 'react'

const Select = ({ label , options ,value , setValue , type , reset, name,invalidFileds,setInValidFileds }) => {
  
  const handleErrorText = () => {
    let nameInvalid = invalidFileds?.find(item => item.name === name)
    let addressInvaild = invalidFileds?.find(item => item.name === "address")


    return `${nameInvalid ? nameInvalid.message: ''}` || `${addressInvaild ? addressInvaild.message: ''}` 
  }
  
  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
        <label className='font-medium' htmlFor="select-address">{label}</label>
        <select 
        value={reset ? '' : value} 
        onChange={(e) =>!name ? setValue(e.target.value) : setValue(prev => ({...prev, [name]: e.target.value}))}
        onFocus={()=>setInValidFileds([])} 
        id="select-address" className='outline-none border border-gray-300 px-1 w-full p-2 rounded-md'
        >
        <option value="">{`-- Chọn ${label}--`}</option>
        {options?.map(item => {
            return (
                <option 
                    key={type === 'province'  ? item?.province_id : type === 'district' ? item?.district_id : item?.code} 
                    value={type === 'province'  
                    ? item?.province_id : type === 'district' ? item?.district_id : item?.code}
                    >
                        {type === "province" ? item?.province_name: type === 'district' ? item?.district_name : item?.value}
                </option>
            )
        })}
        </select>
        {invalidFileds && <small className='text-red-500'>
          {handleErrorText()}
        </small>}
    </div>
  )
}

export default memo(Select)