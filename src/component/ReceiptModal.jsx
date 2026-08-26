import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../component/ReceiptModal.css';

const ReceiptModal = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="receipt-card"
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="receipt-title">INVOICE</h1>
          <div className="receipt-details">
            <p><strong>INVOICE NO:</strong> {invoice.invoice_no}</p>
            <p><strong>DATE:</strong> {invoice.date}</p>
            <p><strong>Cashier:</strong> {invoice.cashier}</p>
          </div>

          <table className="receipt-table">
            <thead>
              <tr>
                <th>no</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.qty}</td>
                  <td>{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="receipt-total">
            <h2>Grand Total:</h2>
            <h2>RM{invoice.total.toFixed(2)}</h2>
          </div>

          <div className="receipt-payment-method">
            <span>PAYMENT METHOD:</span>
            <span>{invoice.payment_method}</span>
          </div>

          <motion.button 
            className="print-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()} // Aksi print
          >
            Print
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReceiptModal;