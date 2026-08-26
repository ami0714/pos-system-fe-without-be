import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";
import Sidebar from '../component/Sidebar';
import '../css/pos.css';
import ReceiptModal from '../component/ReceiptModal';

const PosPage = () => {
  // Data dummy berdasarkan API
  const [products] = useState([
    { id: 1, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 2, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 3, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 4, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 5, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 6, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 7, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 8, name: 'COLA', price: 2.00, stock: 1000 },
    { id: 9, name: 'COLA', price: 2.00, stock: 1000 },
  ]);

  // Data cart dummy
  const [cartItems,setCartItems] = useState([
    { id: 1, name: 'Coca-Cola', qty: 3, price: 2.00 },
    { id: 2, name: 'Maggi', qty: 2, price: 2.00 },
    { id: 3, name: 'Biskut', qty: 2, price: 2.00 },
  ]);

  //dummy receipt 
  const  receiptData =  {
      id: 1,
      invoice_no: 'INV-260818-0001',
      date: '29/01/2026',
      cashier: 'Admin',
      payment: 'Cash',
      total: 12.00,
      status: 'COMPLETED',
      items: [
        { name: 'Coca-Cola', price: 2.00, qty: 2 },
        { name: 'Maggi', price: 2.00, qty: 2 },
        { name: 'Biskut', price: 2.00, qty: 2 },
      ]
    }

  const [receipt,setReceipt] = useState(null
  )

  const handleCloseRigth = ()=>{
        setCartItems(null)
  }
  const [grandTotal,setGrandTotal] = useState(cartItems?.reduce((total,item)=>{
       return total + (item?.price *item?.qty)},0
))
  const [balance,setBalance] = useState(null);

  const handleBalance = (cash)=>{
    if(cash === grandTotal){
        setBalance('no need balance')
    } else{
        setBalance(cash-grandTotal)
    }
    
  }


  const closeReceipt = () => {
    setReceipt(null);
  };

  const [activeTab, setActiveTab] = useState('ALL');

  const [paymentMethod, setPaymentMethod] = useState('CASH');

  return (
    <div className="pos-layout">
      <Sidebar />
      <section className="pos-container">
      {/* Bahagian Kiri (70%) */}
      <div className="pos-left">
        {/* Bar Carian */}
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="search product/scan barcode" 
            className="search-input"
          />
          <button className="add-btn">+</button>
        </div>

        {/* Kategori Tabs */}
        <div className="category-tabs">
          {['ALL', 'DRINK', 'FOOD'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        <div className="product-grid">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="product-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">RM{product.price}</p>
              <div className="product-footer">
                <span className="product-stock">stock:{product.stock}</span>
                <span className="cart-icon"><Icon icon="mdi:cart"/></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bahagian Kanan (30%) - Panel Order */}
      {cartItems && 
       <div className="pos-right">
        <div className="header">
            <h1 className="order-title">ORDER DETAIL</h1>
            <Icon onClick={handleCloseRigth} style={{fontSize:'2em'}} icon="material-symbols:close" />
        </div>
        

        {/* Jadual Item */}
        <table className="order-table">
          <thead>
            <tr className="table-header">
              <th className="col-product">Product</th>
              <th className="col-price">Price</th>
              <th className="col-qty">Qty</th>
              <th className="col-subtotal">Subtotal</th>
              <th className="col-action"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="col-product">{index + 1}. {item?.name}</td>
                <td className="col-price">{item?.price.toFixed(2)}</td>
                <td className="col-qty">{item?.qty}</td>
                <td className="col-subtotal">{(item?.price * item?.qty).toFixed(2)}</td>
                <td className="col-action"><Icon icon="mdi:trash"/></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Clear Cart <Icon icon="mdi:trash"/></span>
          <span>Total Item:{cartItems?.length}</span>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h2 className="section-title">PAYMENT SUMMARY</h2>
          <div className="summary-row">
            <span>Total Item :{cartItems?.length}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal :RM12</span>
          </div>
          <div className="summary-row grand-total">
            <span>Grand Total :RM{grandTotal}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-method">
          <h2 className="section-title">PAYMENT METHOD</h2>
          <div className="method-buttons">
            <button 
              className={`method-btn ${paymentMethod === 'CASH' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('CASH')}
            >
              CASH
            </button>
            <button 
              className={`method-btn ${paymentMethod === 'QR' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('QR')}
            >
              QR
            </button>
           
          </div>
          <div className="cashBalance">
            {paymentMethod =='CASH' &&
            <input onChange={(e)=> handleBalance(e.target.value)} placeholder='input cash amount' className='inputCash' type='number' step='0.01'/>
                
            }
            <span>Balance:RM{balance}</span>

          </div>
           
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <motion.button 
            className="btn-cancel"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button 
            className="btn-proceed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=> setReceipt(receiptData)}
          >
            Proceed
          </motion.button>
        </div>
      </div>
      
      
      }
     
      </section>
      <ReceiptModal invoice={receipt}  onClose={closeReceipt} />
    </div>
  );
};

export default PosPage;