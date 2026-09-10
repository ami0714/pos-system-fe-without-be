import React, { useEffect, useState,useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react";
import Sidebar from '../component/Sidebar';
import '../css/pos.css';
import ReceiptModal from '../component/ReceiptModal';
import QrPayment from '../component/qrPayment';
import {useCategory} from '../hooks/useCategory'
import {useAddOrder} from '../hooks/useCart'
import {useProducts, useProductsByBarcode} from '../hooks/useProduct'




const PosPage = () => {
//useForm untuk barcode
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { barcode: '' }
  });
  //buat ref untuk barcode untuk buat focus secara auto bila page load
  const barcodeInputRef = useRef(null);
  //setField untuk barcode di useForm
  const barcodeField = register('barcode');
  const [barcode, setBarcode] = useState('');


  //useEffect untuk focus pada input barcode bila page load
  useEffect(() => {
    barcodeInputRef.current?.focus();
  }, []);

  // Data cart dummy
  const [cartItems,setCartItems] = useState([]);


  //fungsi addtocart
 const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      // Jika item sudah ada dalam cart, tambahkan kuantiti
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      // Jika item belum ada dalam cart, tambahkan item baru
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  }

  


  const [categoryId, setCategoryId] = useState(5);
  const { data: category, isLoading, isError, error } = useCategory();
  const { data: product, isLoading: isProductLoad, isError: isProductErr, error: productErro } = useProducts(categoryId, 'ALL');
  const { data: barcodeProduct, isLoading: isBarcodeLoading, isError: isBarcodeError } = useProductsByBarcode(barcode);
  const [receipt, setReceipt] = useState(null);

  const onBarcodeSubmit = ({ barcode: submittedBarcode }) => { //fungsi untuk handleSUbmit barcode
    setBarcode(submittedBarcode.trim());
  };
//jika ada barcode product maka secara auto akan setCartitem tu mengikut condition yang ada,jika barcode tiada maka return terus
  useEffect(() => {
    if (!barcodeProduct || !barcode) return;

    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === barcodeProduct.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === barcodeProduct.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...currentItems, { ...barcodeProduct, qty: 1 }];
    });
    reset();
    setBarcode('');
    barcodeInputRef.current?.focus();
  }, [barcodeProduct, barcode, reset]);



  const handleCloseRigth = ()=>{
      setCartItems([])
  }
    const grandTotal = cartItems.reduce((total, item) => {
      return total + (Number(item?.sell_price) * Number(item?.qty));
    }, 0);
  const [balance,setBalance] = useState(null);

  const handleBalance = (cash)=>{
   if(paymentMethod === 'CASH'){
     const cashAmount = Number(cash);
    setBalance(cashAmount - grandTotal);
   }
   
  }
const [paymentMethod, setPaymentMethod] = useState('CASH');
 const { mutate } = useAddOrder();
 const [isShowQR, setIsShowQR] = useState(false);
  const submitOrder = () => {
    const items = cartItems.map(item => ({
      productId: item.id,
      qty: item.qty,
    }));
       
    const payload = {
      items: items,
      total: grandTotal,
      paymentMethod: paymentMethod,
      paidAmount: paymentMethod === 'CASH' ? grandTotal + Number(balance) : grandTotal,
      balance: paymentMethod === 'CASH' ? Number(balance) : 0,
      discount: 0.00,
    };

    if(paymentMethod === 'CASH' && Number(balance) < 0){
        alert('Cash amount is less than grand total');
        return;
    }

    if(cartItems.length === 0) {
        alert('Cart is empty');
        return;
    }
    mutate(payload, {
      onSuccess: (data) => {
        setReceipt(data);
        setCartItems([]);
        setIsShowQR(false);
      },
    });
  }

  const proceedOrder = () => {
    if (paymentMethod === 'QR') {
      setIsShowQR(true);
      return;
    }

    submitOrder();
  }

  const closeQr = () => {
    setIsShowQR(false);
  }
  const closeReceipt = () => {
    setReceipt(null);
  };
  const handleCloseRight = () => {
    setCartItems([]);
  }

  

  

  return (
    <div className="pos-layout">
    
      <Sidebar />
      <section className="pos-container">
      {/* Bahagian Kiri (70%) */}
      <div className="pos-left">
        {/* Bar Carian */}
        <form className="search-bar" onSubmit={handleSubmit(onBarcodeSubmit)}>
          <input 
            type="text" 
            placeholder="search product/scan barcode" 
            className="search-input"
            {...barcodeField}
            ref={(element) => {
              barcodeField.ref(element);
              barcodeInputRef.current = element;
            }}
          />
          <button type="submit" className="add-btn" disabled={isBarcodeLoading}>
            {isBarcodeLoading ? '...' : '+'}
          </button>
          {isBarcodeError && <span className="barcode-error">Product not found</span>}
        </form>

        {/* Kategori Tabs */}
        <div className="category-tabs">
          
          {isLoading? <span>loading</span>:
          category?.map((category,index) => (
            <button
              key={category?.categoryId}
              className={`tab-btn ${categoryId === category?.categoryId ? 'active' : ''}`}
              onClick={() => setCategoryId(category?.categoryId)}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        <div className="product-grid">
          {isProductLoad? <span>loading</span>:
          product?.map((product, index) => (
            <motion.div
              key={index}
              className="product-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
            >
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">RM{product.sell_price}</p>
              <div className="product-footer">
                <span className="product-stock">stock:{product.stock}</span>
                <span className="cart-icon"><Icon  icon="mdi:cart"/></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bahagian Kanan (30%) - Panel Order */}
      {cartItems.length > 0  && 
       <div className="pos-right">
        <div className="header">
            <h1 className="order-title">ORDER DETAIL</h1>
            <Icon onClick={handleCloseRight} style={{fontSize:'2em'}} icon="material-symbols:close" />
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
                <td className="col-price">{item?.sell_price}</td>
                <td className="col-qty">{item?.qty}</td>
                <td className="col-subtotal">{(item?.sell_price * item?.qty).toFixed(2)}</td>
                <td onClick={()=>removeFromCart(item.id)} className="col-action"><Icon icon="mdi:trash"/></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Clear Cart <Icon onClick={() => setCartItems([])} icon="mdi:trash"/></span>
          <span>Total Item:{cartItems?.length}</span>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary">
          <h2 className="section-title">PAYMENT SUMMARY</h2>
          <div className="summary-row">
            <span>Total Item :{cartItems?.length}</span>
          </div>
          <div className="summary-row">
            <span>Subtotal :RM{grandTotal.toFixed(2)}</span>
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
              onClick={() =>{ setPaymentMethod('QR'); setBalance(0);}}
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
            onClick={() => proceedOrder()}
          >
            Proceed
          </motion.button>
        </div>
      </div>
      
      
      }
     
      </section>
      
{receipt && !isShowQR && <ReceiptModal invoice={receipt} onClose={closeReceipt} />}
{isShowQR && <QrPayment isProceed={submitOrder} showQr={isShowQR} onClose={closeQr} />}
    </div>
  );
};

export default PosPage;