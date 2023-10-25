import React, { useEffect, useState } from 'react'
import { Overview, Address,Loading,Button } from "../../components"
import { apiCreatePost, apiUpdatePost, apiUploadImages } from '../../services'
import icons from '../../utils/icons'
import { getCodes,getCodesArea } from '../../utils/Common/getCodes'
import Swal from "sweetalert2"
import { useSelector,useDispatch } from 'react-redux'
import validate from "../../utils/Common/validateFileds"
import * as actions from "../../store/action"
import { resetDataEdit } from '../../store/action'

const {BsCameraFill,ImBin} = icons

const createPost = ({isEdit}) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imagesPreview, setImagesPreview] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setisLoading] = useState(false)  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [invalidFileds, setInValidFileds] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {prices,areas,categories,provinces} = useSelector(state => state.app)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {currentData} = useSelector(state => state.user)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {dataEdit} = useSelector(state => state.post)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image)
      images && setImagesPreview(images)
    }
    return () => {
      
    }
  }, [dataEdit])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [payLoad, setPayLoad] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || '',
      title: dataEdit?.title || '',
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images:dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
      address: dataEdit?.address || '',
      priceCode: dataEdit?.priceCode || '',
      areaCode: dataEdit?.areaCode || '',
      description:dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
      target: dataEdit?.overviews?.target || '',
      province: dataEdit?.province || '',
    }

    return initData  
  });
  console.log(dataEdit)
  const handleFiles = async(e) => {
    e.stopPropagation()
    setisLoading(true)
    let images = []
    const files = e.target.files
    const formData = new FormData()
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
      const response  = await apiUploadImages(formData)
      if (response.status === 200) images = [...images, response.data?.secure_url]
    }
    setisLoading(false)
    setImagesPreview(prev => [...prev,...images])
    setPayLoad(prev => ({...prev,images:[...prev.images, ...images]}))
  }
  
  const handleDeleteImage = (image) => {
    setImagesPreview(prev => prev?.filter(item => item !== image))
    setPayLoad(prev => ({
      ...prev,
      images: prev.images?.filter(item => item !== image)
    }))
  }
  const handleSubmit = async() => {
    let priceCodeArr = getCodes(+payLoad.priceNumber / Math.pow(10,6),prices,1,15)
    let priceCode = priceCodeArr[0]?.code
    let areaCodeArr = getCodesArea(+payLoad.areaNumber,areas,0,90)
    let areaCode = areaCodeArr[0]?.code

    let finalPayload = {
      ...payLoad,
      priceCode,
      areaCode,
      userId:currentData.id,
      priceNumber: +payLoad.priceNumber / Math.pow(10,6),
      target: payLoad.target || 'Tất cả',
      label: `${categories?.find(item => item.code === payLoad?.categoryCode)?.value} ${payLoad?.address?.split(',')[0]}`
    }
    const result = validate(finalPayload,setInValidFileds)
  
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit.id
        finalPayload.attributesId = dataEdit.attributesId
        finalPayload.imagesId = dataEdit.imagesId
        finalPayload.overviewId = dataEdit.overviewId

        const response = await apiUpdatePost(finalPayload)
        if (response?.data.err === 0) {
          Swal.fire('Thành công', 'Đã chỉnh sửa thành công','success').then(() => {
            resetPayLoad()
            dispatch(resetDataEdit())
          })
        }else{
          Swal.fire('Oops!', 'Có lỗi gì đó','error')
        }
        }else{
            const response = await apiCreatePost(finalPayload)
            if (response?.data.err === 0) {
            Swal.fire('Thành công', 'Đã thêm bài đăng mới','success').then(() => {
              resetPayLoad()
            })
          }else{
            Swal.fire('Oops!', 'Có lỗi gì đó','error')
          }
        }
      }
  }
  const resetPayLoad = () => {
    setPayLoad({
      categoryCode: '',
      title: '',
      priceNumber: 0,
      areaNumber: 0,
      images: '',
      address: '',
      priceCode: '',
      areaCode: '',
      description: '',
      target: '',
      province: '',
    }) 
  }
  
  return (
    <div className='px-6 gap-4'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>{isEdit ? "Chỉnh sửa tin đăng" : "Tạo tin mới"}</h1>
      <div className='flex gap-4'>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address setInValidFileds={setInValidFileds} invalidFileds={invalidFileds} payLoad={payLoad} setPayLoad={setPayLoad}/>
          <Overview setInValidFileds={setInValidFileds} invalidFileds={invalidFileds} payLoad={payLoad} setPayLoad={setPayLoad}/>
          <div className='w-full mb-6'>
            <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className='w-full'>
              <label className='flex flex-col items-center justify-center boder-gray-400 w-full border-2 h-[200px] my-4 gap-4 border-dashed rounded-md' htmlFor="file">
                {isLoading 
                ? <Loading/> 
                : <div className='flex flex-col items-center justify-center'>
                  <BsCameraFill size={"50px"}/>
                  Thêm ảnh
                </div>}
              </label>
              <input onChange={handleFiles} hidden type="file" id='file' multiple/>
              <small className='text-red-500 block w-full'>
                {invalidFileds?.some(item => item.name === 'images') && invalidFileds?.find(item => item.name === 'images')?.message}
              </small>
              <div className='w-full'>
                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                <div className='flex gap-4 items-center'>
                  {imagesPreview?.map(item =>{
                    return(
                      <div key={item} className='relative w-1/3 h-1/3'>
                        <img src={item} alt="preview" className='w-full h-full object-cover rounded-md'/>
                        <span 
                        title='Xóa'
                        onClick={() => handleDeleteImage(item)} 
                        className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                        >
                          <ImBin/>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
            <Button 
              onClick={handleSubmit}
              text={isEdit ? "Cập nhật" : "Tạo mới"}
              bgColor="bg-green-600" 
              textColor="text-white"
            />
          </div>
          <div className='w-[30%] flex-none'>
            maps
          </div>
        </div>
    </div>
  )
}

export default createPost