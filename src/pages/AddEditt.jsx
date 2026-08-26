import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import '../css/AddEdit.css';

const ProductFormPage = () => {
  const { id } = useParams(); // Ambil ID dari URL (jika ada)
  const navigate = useNavigate();
  
  // Dummy data untuk mode Edit (hanya satu data)
  const dummyProduct = {
    id: 1,
    barcode: '1234567890123',
    name: 'Coca-Cola',
    category: 'Minuman',
    cost_price: '1.50',
    sell_price: '2.00',
    stock: '45',
    min_stock: '10',
    unit: 'pcs'
  };

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

  // Guna useEffect untuk set data jika mode Edit (ada id)
  useEffect(() => {
    if (id) {
      // Jika ada id, kita isi dengan dummy data
      reset({
        barcode: dummyProduct.barcode,
        name: dummyProduct.name,
        category: dummyProduct.category,
        cost_price: dummyProduct.cost_price,
        sell_price: dummyProduct.sell_price,
        stock: dummyProduct.stock,
        min_stock: dummyProduct.min_stock,
        unit: dummyProduct.unit
      });
    }
  }, [id]);

  // Fungsi untuk update state input
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // Fungsi submit (Add atau Update)
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log('Update produk dengan ID:', id, formData);
      // Panggil API update di sini
    } else {
      console.log('Tambah produk baru:', formData);
      // Panggil API create di sini
    }
    navigate('/products'); // Kembali ke halaman senarai produk selepas submit
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
        <h1 className="form-title">{id ? 'Edit Product':'Add Product'}</h1>
        
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
              className="form-select"
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="Minuman">Minuman</option>
              <option value="Makanan">Makanan</option>
              <option value="Barang Dapur">Barang Dapur</option>
            </select>
          </div>

          {/* Cost price */}
          <div className="form-group">
            <label>Cost price</label>
            <input 
              type="number" 
              name="cost_price" 
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
                disabled ={id?true:false}
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
              <option value="pcs">pcs</option>
              <option value="kg">kg</option>
              <option value="botol">botol</option>
              <option value="pack">pack</option>
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
              {id ? 'Update' : 'Add'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
    </div>
  );
};

export default ProductFormPage;