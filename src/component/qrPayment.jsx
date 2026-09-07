import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './qrPayment.css';
import { QRCodeSVG } from 'qrcode.react';

const QrPayment = ({ onClose,showQr,isProceed }) => {

    if(!showQr) return null;


  return (
    <AnimatePresence>
      <motion.div 
        className="qr-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="qr-payment-card"
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 50, scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <QRCodeSVG value="https://example.com/payment" size={200} />



          <motion.button
            className="qr-payment-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isProceed}
          >
            Proceed to Payment
          </motion.button>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QrPayment;