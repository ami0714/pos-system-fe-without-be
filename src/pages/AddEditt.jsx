import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {useProductsByBarcode,useAddproduct,useEditproduct} from '../hooks/useProduct'
import {useCategory} from '../hooks/useCategory'
import {useUnits} from '../hooks/useUnit'
import '../css/AddEdit.css';

const ProductFormPage = () => {
  const { barcode } = useParams(); // Ambil ID dari URL (jika ada)
  const navigate = useNavigate();
  const { data: category,isLoading:catLoading,isError:catErr,error:catError} = useCategory();
  const {data:unit,isLoading:unitLoading,isError:isUnitErr} = useUnits();
   const { data: product, isLoading:productLoading, isError  } = useProductsByBarcode(barcode);

  
  // Dummy data untuk mode Edit (hanya satu data)
  

  // useForm untuk formData
  // const [formData, setFormData] = useState({
  //   barcode: '',
  //   name: '',
  //   category: '',
  //   cost_price: '',
  //   sell_price: '',
  //   stock: '',
  //   min_stock: '',
  //   unit: ''
  // });
  const {register: regisInput
    ,handleSubmit,formState:{error},reset} = useForm({
  defaultValues:{
    barcode: '',
    name: '',
    category: '',
    cost_price: '',
    sell_price: '',
    stock: '',
    min_stock: '',
    unit: ''
  }
 })
   
  // Guna useEffect untuk set data jika mode Edit (ada barcode)
  const [productId,setProductId] = useState(null);
  useEffect(() => {
    if (barcode) {
      // Jika ada id, kita isi dengan dummy data
      reset({
        barcode: product?.barcode,
        name: product?.name,
        category: product?.category_id,
        cost_price: product?.cost_price,
        sell_price: product?.sell_price,
        stock: product?.stock,
        min_stock: product?.min_stock,
        unit: product?.unitId
      });
      setProductId(product?.id)
    }
  }, [barcode , product, reset]);

  // Fungsi untuk update state input
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // Fungsi submit (Add atau Update)
  const {mutate} = useAddproduct()
  const {mutate:mutateEdit} = useEditproduct()
  const onSubmit = (data) => {
    
    if (barcode) {
         if(!data){
          throw new Error("err edit");
          
         }
         mutateEdit({payload:data,productId:productId},{
        onSuccess:(data) =>{
          alert('success edit product')
        navigate('/product')

        },
        onError:(err)=>{
          alert(err?.message || 'error add product')
        }
       }
       )
      
    } else {
      if(!data){
        throw new Error("no data to send");
        
      }
       mutate({payload:data},{
        onSuccess:(data) =>{
          alert('success add product')
        navigate('/product')

        },
        onError:(err)=>{
          alert(err?.message || 'error add product')
        }
       }
       )

    }
  
  };

  return (
    <div className="product-form-layout">
      <Sidebar/>
    <section className="product-form-container">
      <motion.div 
        className="form-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="form-title">{barcode ? 'Edit Product':'Add Product'}</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Barcode */}
          <div className="form-group">
            <label>Barcode</label>
            <input 
              type="text" 
              name="barcode" 
              
              {...regisInput('barcode')}
              // value={formData.barcode}
              // onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              {...regisInput('name')}
              // value={formData.name}
              // onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="dropdown-label">
              category <span className="chevron">⌄</span>
            </label>
            <select 
              name="category" 
              {...regisInput('category')}
              // value={formData.category}
              // onChange={handleChange}
              value={product?.category_id}
              className="form-select"
            >
              {catLoading ? (
                <option value="">Loading...</option>
              ) : (
                category?.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Cost price */}
          <div className="form-group">
            <label>Cost price</label>
            <input 
              type="number" 
              name="cost_price" 
              step="any"
              {...regisInput('cost_price')}
              // value={formData.cost_price}
              // onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Sell price */}
          <div className="form-group">
            <label>Sell price</label>
            <input 
              type="number" 
              name="sell_price" 
              step="any"
              {...regisInput('sell_price')}
              // value={formData.sell_price}
              // onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Stock & Min stock (side by side) */}
          <div className="form-row">
            <div className="form-group half">
              <label>Stock</label>
              <input 
                type="number" 
                name="stock" 
                {...regisInput('stock')}
                // value={formData.stock}
                // onChange={handleChange}
                className="form-input small"
                disabled ={barcode?true:false}
              />
            </div>
            <div className="form-group half">
              <label>Min stock</label>
              <input 
                type="number" 
                name="min_stock"
                {...regisInput('min_stock')} 
                // value={formData.min_stock}
                // onChange={handleChange}
                className="form-input small"
              />
            </div>
          </div>

          {/* Stock Unit */}
          <div className="form-group">
            <label className="dropdown-label">
              Stock Unit <span className="chevron">⌄</span>
            </label>
            <select 
              name="unit" 
              {...regisInput('unit')}
              // value={formData.unit}
              // onChange={handleChange}
              className="form-select"
            >
             {unitLoading ? (
                <option value="">Loading...</option>
              ) : (
                unit?.map((cat) => (
                  <option key={cat.categoryId} value={cat.unitId}>
                    {cat.unitName}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {barcode ? 'Update' : 'Add'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
    </div>
  );
};

export default ProductFormPage;