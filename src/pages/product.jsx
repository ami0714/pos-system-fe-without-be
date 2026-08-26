import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/product.css';
import Sidebar from '../component/Sidebar';
import SearchBar from '../component/SearchBar'
import { Icon } from '@iconify/react';

const ProductListPage = () => {
  // Data dummy berdasarkan API
  const [products] = useState([
    { id: 1, barcode: '1234567890123', name: 'Coca-Cola', category: 'Beverages', cost_price: '1.50', sell_price: '2.00', stock: 45, unit: 'pcs' },
    { id: 2, barcode: '9876543210987', name: 'Maggi', category: 'Food', cost_price: '1.20', sell_price: '2.00', stock: 100, unit: 'pcs' },
    { id: 3, barcode: '1112223334445', name: 'Biskut', category: 'Food', cost_price: '1.00', sell_price: '2.00', stock: 10, unit: 'pcs' },
    { id: 4, barcode: '5556667778889', name: 'Minyak Masak', category: 'Kitchen Supplies', cost_price: '5.00', sell_price: '7.50', stock: 3, unit: 'botol' },
    { id: 5, barcode: '0001112223334', name: 'Gula', category: 'Kitchen Supplies', cost_price: '2.00', sell_price: '3.00', stock: 0, unit: 'kg' },
  ]);

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  console.log(search)
  

  const filteredProducts = products.filter((product) => {//(matchesCategory && matchesStock)
    const matchesCategory = categoryFilter === 'ALL' || product.category === categoryFilter;
    const matchesStock = stockFilter === 'ALL'
      || (stockFilter === 'LOW' && product.stock > 0 && product.stock <= 10)
      || (stockFilter === 'OUT' && product.stock === 0);
      if(search !== ''){
        const bySearch = product.name == search || product.barcode == search 
            return matchesCategory && matchesStock && bySearch;
      }
    return matchesCategory && matchesStock;
  });

  return (
    <div className="Product-layout" >
        <Sidebar />
        <section className="product-list-container">
      {/* Header Bar */}
      <div className="page-header">
        <h1 className="page-title">Product list</h1>
        <motion.button 
          className="add-product-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          add Product
        </motion.button>
      </div>

      {/* Search & Filter Bar */}
      <div className="controls-bar">
       <SearchBar onValue={(val)=> setSearch(val)} />
        <label className="filter-item">
          <span className="filter-text">Category</span>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="ALL">All Categories</option>
            <option value="Beverages">Beverages</option>
            <option value="Food">Food</option>
            <option value="Kitchen Supplies">Kitchen Supplies</option>
          </select>
         
        </label>
        <label className="filter-item">
          <span className="filter-text">Stock</span>
          <select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)}>
            <option value="ALL">All Stock</option>
            <option value="LOW">Low Stock</option>
            <option value="OUT">Out of Stock</option>
          </select>
          
        </label>
      </div>

      {/* Data Table */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th className="col-no">NO</th>
              <th className="col-barcode">Barcode</th>
              <th className="col-name">Product name</th>
              <th className="col-category">Category</th>
              <th className="col-price">cost price</th>
              <th className="col-price">Sell price</th>
              <th className="col-stock">Stock</th>
              <th className="col-unit">Unit</th>
              <th className="col-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <motion.tr 
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <td>{index + 1}</td>
                <td>{product.barcode}</td>
                <td className="product-name-cell">{product.name}</td>
                <td>{product.category}</td>
                <td>{product.cost_price}</td>
                <td>{product.sell_price}</td>
                <td className={product.stock === 0 ? 'stock-empty' : ''}>{product.stock}</td>
                <td>{product.unit}</td>
                <td className="action-cell">
                  <motion.button 
                    className="icon-btn"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon icon="cuida:edit-outline" />
                  </motion.button>
                  <motion.button 
                    className="icon-btn"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                     <Icon icon="mdi:trash" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </div >
    
  );
};

export default ProductListPage;