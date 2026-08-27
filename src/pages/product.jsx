import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/product.css';
import Sidebar from '../component/Sidebar';
import SearchBar from '../component/SearchBar'
import { Icon } from '@iconify/react';
import {useCategory} from '../hooks/useCategory'
import {useProducts} from '../hooks/useProduct'

const ProductListPage = () => {
  const [categoryId, setCategoryId] = useState(5);
    const [stockFilter, setStockFilter] = useState('ALL');
  const { data: category, isLoading, isError, error } = useCategory();
  const { data: product, isLoading: isProductLoad, isError: isProductErr, error: productErro } = useProducts(categoryId, stockFilter);


  const [search, setSearch] = useState('');
  console.log(search)




   const filteredProducts = product?.filter((product) => {
      if(search !== ''){
        const bySearch = product?.name == search || product?.barcode == search 
            return bySearch;
      }
      return true
  });
  

  // const filteredProducts = products.filter((product) => {//(matchesCategory && matchesStock)
  //   const matchesCategory = categoryFilter === 'ALL' || product.category === categoryFilter;
  //   const matchesStock = stockFilter === 'ALL'
  //     || (stockFilter === 'LOW' && product.stock > 0 && product.stock <= 10)
  //     || (stockFilter === 'OUT' && product.stock === 0);
  //     if(search !== ''){
  //       const bySearch = product.name == search || product.barcode == search 
  //           return matchesCategory && matchesStock && bySearch;
  //     }
  //   return matchesCategory && matchesStock;
  // });

  

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
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
            {isLoading ? (
              <option value="">Loading...</option>
            ) : (
              category?.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId} >
                  {cat.categoryName}
                </option>
              ))
            )}
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
            {isProductLoad?(
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>Loading...</td>
                </tr>
              ) : filteredProducts?.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No products found</td>
                </tr>
              ) :
            filteredProducts?.map((product, index) => (
              <motion.tr 
                key={product?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <td>{index + 1}</td>
                <td>{product?.barcode}</td>
                <td className="product-name-cell">{product?.name}</td>
                <td>{product?.category}</td>
                <td>{product?.cost_price}</td>
                <td>{product?.sell_price}</td>
                <td className={product?.stock === 0 ? 'stock-empty' : ''}>{product?.stock}</td>
                <td>{product?.unit}</td>
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