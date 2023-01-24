import React, { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Avatar from '../../avatar.jpg'
export default function Admin(){
    const [select1,setSelect1] = useState([])
    const [modalVisible,setModalVisible] = useState(false)
    const [selectCategory,setSelectCategory] = useState("")
   
    const [images,setImages] = useState("")
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0)
    const [product,setProduct] = useState([])
   
useEffect(()=>{
getSelect()
getProduct()
},[])
function getProduct(){
    axios({
        url:"http://localhost:3020/products",
        method:"get"
    }).then((res)=>{

        const products = res.data
        axios({
            url:"http://localhost:3020/productPhotos",
            method:"get"
        }).then((res)=>{
          res.data.map((item,index)=>{
            if(products[index].id === item.productId ){
                products[index] = {...products[index],photo:item.photo}
            }
          })
          setProduct([...products])
        }) 
    })
}
function getSelect(){
    axios({
        url:"http://localhost:3020/category",
        method:"get"
    }).then((res)=>{ 
        setSelect1(res.data)
    })
}
function handleChange(newValue,actionMeta){
if(actionMeta.action==="select-option"){
setSelectCategory(newValue)
}else{
axios({
    url:"http://localhost:3020/category",
    method:"post",
    data:{name:newValue.label}
}).then((res)=>{
setSelectCategory(res.data.id)
})
}
}
function OpenModal(){
setModalVisible(true)
}
function handleImg(e){
let file =e.target.files[0]
const reader = new FileReader()
reader.readAsDataURL(file)
reader.onload=()=>{
    setImages(reader.result)
    console.log(reader.result);
}
}
 function handleSave(){
  axios({
    url:"http://localhost:3020/products",
    method:"post",
    data:{
name,
price,
categoryId:selectCategory
    }
  }).then((res)=>{
axios({
    url:"http://localhost:3020/productPhotos",
    method:"post",
    data:{
productId:res.data.id,
photo:images
    }
}).then((res)=>{
    console.log(res.data);
})
  })
}
return(
<div className="container">
<button onClick={OpenModal} className='btn btn-info my-3 mx-5'>addProduct</button>
<table className="table">
    <thead className="table-dark">
        <tr>
            <th>id</th>
            <th>category</th>
            <th>name</th>
            <th>price</th>
            <th>photos</th>
            <th>action</th>
        </tr>
    </thead>
    <tbody>
        {
            product.map((item,index)=>{
                return <tr key={item.id}>
                    
                    <td>{item.id}</td>
                    <td>{item.categoryId.label}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td><img width={100} src={item.photo} alt="" /></td>
                 
                </tr>
            })
        }
    </tbody>
</table>
<Rodal width={400} height={600} visible={modalVisible} onClose={()=>setModalVisible(false)}>

<label>
    {
        images ? <img src={images} width={100} height={100} style={{borderRadius:"50%"}} alt="" />:
        <img src={Avatar} width={80} style={{borderRadius:"50%"}} alt="" />
    }

<input onChange={handleImg} type="file" className="d-none" />
</label>
   <CreatableSelect className="my-2"
   onChange={handleChange}
   options={select1.map((item)=>({
       value:item.id,
       label:item.name
   }))}
   />
   <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="product name" className="form-control" />
   <input  onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="product price" className="form-control" />
   <button onClick={handleSave} className="btn btn-success">save</button>

</Rodal>
</div>
 )
}