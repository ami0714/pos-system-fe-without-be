import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Sidebar from '../component/Sidebar';
import SearchBar from '../component/SearchBar';
import '../css/StockPage.css';

const StockPage = () => {
  const [activeTab, setActiveTab] = useState('stock_in'); // 'stock_in' atau 'movement_log'
  const [stockMode, setStockMode] = useState('IN'); // 'IN' atau 'ADJUSTMENT'

  // Data dummy produk (dari API)
  const dummyProduct = {
    name: 'Magii',
    current_stock: '1000',
    unit: 'box'
  };

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
      {activeTab === 'stock_in' ? (
        <div className="stock-in-container">
          {/* Search Bar & Mode Buttons */}
          <div className="search-row">
            <SearchBar/>
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
                  <span className="info-value">{dummyProduct.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Current Stock:</span>
                  <span className="info-value">{dummyProduct.current_stock} {dummyProduct.unit}</span>
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
          </motion.div>
        </div>
      ) : (
        <div className="movement-log-container">
          {/* Search Bar */}
          <div className="search-row centered">
            <SearchBar />
          </div>

          {/* Type & Date Filters */}
          <div className="filters-row">
            <div className="filter-item">
              <span className="filter-label">Type</span>
              <span className="chevron">⌄</span>
            </div>
            <div className="filter-item">
              <span className="filter-label">Date:</span>
              <input type="date" defaultValue="2026-08-01" className="date-input" />
              <span className="dash">—</span>
              <input type="date" defaultValue="2026-08-20" className="date-input" />
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
              <tbody>
                {movements.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.product}</td>
                    <td>{item.type}</td>
                    <td>{item.admin}</td>
                    <td className={item.qty.startsWith('+') ? 'qty-in' : 'qty-out'}>{item.qty}</td>
                    <td>{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
    </div>
  );
};

export default StockPage;