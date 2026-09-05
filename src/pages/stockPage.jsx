import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Sidebar from '../component/Sidebar';
import SearchBar from '../component/SearchBar';
import '../css/StockPage.css';
import {useProductsByBarcode} from '../hooks/useProduct'
import {useStock} from '../hooks/useStock'

const StockPage = () => {

  const [barcode,setBarcode] = useState(null)
  const [activeTab, setActiveTab] = useState('stock_in'); // 'stock_in' atau 'movement_log'
  const [stockMode, setStockMode] = useState('IN'); // 'IN' atau 'ADJUSTMENT'
  const { data: product, isLoading:productLoading, isError, error } = useProductsByBarcode(barcode);




  //movelog
    const [type,setType] = useState('ALL');
    const [startDate,setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { data:productLog, isLoading:logLoading,isError:productErr,error:logErr} = useStock(type,startDate,endDate)
  

  

const typeFilter =['ALL','IN','OUT','SALE','ADJUST'];
  

  // Dummy data untuk Stok Movement Log
  const movements = [
    { id: 1, date: '2026-08-01', product: 'Magii', type: 'IN', admin: 'Admin', qty: '+100', note: 'Stok baru dari pembekal' },
    { id: 2, date: '2026-08-05', product: 'Coca-Cola', type: 'SALE', admin: 'Cashier', qty: '-2', note: 'Jualan resit INV-001' },
    { id: 3, date: '2026-08-10', product: 'Biskut', type: 'ADJUST', admin: 'Admin', qty: '-5', note: 'Roti luput tarikh' },
    { id: 4, date: '2026-08-15', product: 'Minyak Masak', type: 'IN', admin: 'Admin', qty: '+50', note: 'Invois #9921' },
  ];

  // useForm untuk Stock In & Adjustment
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      stock: '',
      cost_price: '',
      note: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    console.log('Mode:', stockMode);
    // Panggil API di sini
    // reset(); // optional untuk clear form
  };

  return (
    <div className="stock-page-layout">
    <Sidebar />
    <section className="stock-page">
      {/* Tab Header */}
      <div className="tabs-header">
        <motion.button
          className={`tab ${activeTab === 'stock_in' ? 'active' : ''}`}
          onClick={() => setActiveTab('stock_in')}
          whileTap={{ scale: 0.95 }}
        >
          Stock In & Adjustment
        </motion.button>
        <motion.button
          className={`tab ${activeTab === 'movement_log' ? 'active' : ''}`}
          onClick={() => setActiveTab('movement_log')}
          whileTap={{ scale: 0.95 }}
        >
          Stok Movement Log
        </motion.button>
      </div>

      {/* Kandungan Tab */}
      {activeTab === 'stock_in'  ? (
        <div className="stock-in-container">
          {/* Search Bar & Mode Buttons */}
          <div className="search-row">
            <SearchBar onValue={(value) => setBarcode(value)}/>
            <div className="mode-buttons">
              <motion.button
                className={`mode-btn ${stockMode === 'IN' ? 'active' : ''}`}
                onClick={() => setStockMode('IN')}
                whileTap={{ scale: 0.95 }}
              >
                Stock IN
              </motion.button>
              <motion.button
                className={`mode-btn ${stockMode === 'ADJUSTMENT' ? 'active' : ''}`}
                onClick={() => setStockMode('ADJUSTMENT')}
                whileTap={{ scale: 0.95 }}
              >
                Adjustment
              </motion.button>
            </div>
          </div>
       
          {/* Form Card */}
          { product && barcode ? 
          <motion.div
            className="stock-form-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="display-info">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{product?.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Current Stock:</span>
                  <span className="info-value">{product?.stock} {product?.unit}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  {...register('stock', { required: 'Stock is required' })}
                  className="form-input small-input"
                />
                {errors.stock && <span className="error">{errors.stock.message}</span>}
              </div>

              <div className="form-group">
                <label>Cost price</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('cost_price', { required: 'Cost price is required' })}
                  className="form-input medium-input"
                />
                {errors.cost_price && <span className="error">{errors.cost_price.message}</span>}
              </div>

              <div className="form-group">
                <label>Note</label>
                <input
                  type="text"
                  {...register('note')}
                  className="form-input long-input"
                />
              </div>

              <div className="form-actions">
                <motion.button
                  type="submit"
                  className="save-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </div>
            </form>
          </motion.div> :
          <span>please insert barcode</span>
          

          }
        </div>
      ) : (
        <div className="movement-log-container">

          {/* Type & Date Filters */}
          <div className="filters-row">
            <div className="filter-item">
              <span className="filter-label">Type</span>
              <select value={type} onChange={(event) => setType(event.target.value)}>
            {  
              typeFilter?.map((cat,index) => 
                <option key={index} value={cat} >
                  {cat}
                  
                </option>)
                }
              
                </select>
            </div>
            <div className="filter-item">
              <span className="filter-label">Date:</span>
              <input type="date" onChange={(e) => setStartDate(e.target.value)} defaultValue={null} className="date-input" />
              <span className="dash">—</span>
              <input type="date" onChange={(e)=> setEndDate(e.target.value)} defaultValue={null} className="date-input" />
            </div>
          </div>

          {/* Movement Table */}
          <div className="table-wrapper">
            <table className="movement-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Date</th>
                  <th>Product name</th>
                  <th>Type</th>
                  <th>Admin name</th>
                  <th>Quantity</th>
                  <th>Note</th>
                </tr>
              </thead>
             {!logLoading ?
              <tbody>
                {productLog?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.date}</td>
                    <td>{item?.productName}</td>
                    <td>{item?.movType}</td>
                    <td>{item?.adminName}</td>
                    <td >{item?.quantity}</td>
                    <td>{item?.note}</td>
                  </tr>
                ))}
              </tbody>
              :
              
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>Loading...</td>
                </tr>
              


             }
            </table>
          </div>
        </div>
      )}
    </section>
    </div>
  );
};

export default StockPage;