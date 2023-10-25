import React from 'react'

const InputFromV2 = ({label , unit, value, setValue, name, small,invalidFileds,setInValidFileds, direction}) => {
  return (
    <div className={`flex ${direction ? direction : 'flex-col'}`}>
        <label className='w-[16.8%] flex items-center' htmlFor="title">{label}</label>
        <div className='flex flex-auto flex-col items-center'>
            <div className='flex w-full items-center'>
              <input 
                type="text" 
                id="title" 
                className={`${unit ? 'rounded-tl-md rounded-bl-lg' :'rounded-md'} border outline-none flex-auto border-gray-300 p-2`}
                value={value}
                onChange={(e) => setValue(prev => ({...prev, [name]:e.target.value}))}
                invalidFileds={invalidFileds}
                onFocus={() =>setInValidFileds && setInValidFileds([])}
            />
            </div>
            {unit && <span className='p-2 border rounded-tr-md rounded-br-lg flex flex-none w-16 bg-gray-200 flex items-center justify-center'>{unit}</span>}
            {invalidFileds?.some(item => item.name === name) && <small className='text-red-500 block w-full'>{invalidFileds?.find(item => item.name === name)?.message}
        </small>}
        </div>
        {small && <small className='opacity-70 whitespace-nowrap'>{small}</small>}  
    </div>
    )
  }
export default InputFromV2
