import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Icon} from '@iconify/react';
import ReceiptModal from '../component/ReceiptModal'; // Import komponen resit
import SearchBar from '../component/SearchBar';
import Sidebar from '../component/Sidebar';
import '../css/TransactionPage.css';

const TransactionsPage = () => {
  // Data dummy berdasarkan dokumen API
  const [transactions] = useState([
    {
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
    },
    {
      id: 2,
      invoice_no: 'INV-260818-0002',
      date: '30/01/2026',
      cashier: 'Cashier',
      payment: 'QR',
      total: 8.50,
      status: 'COMPLETED',
      items: [
        { name: 'Minyak Masak', price: 7.50, qty: 1 },
        { name: 'Gula', price: 1.00, qty: 1 },
      ]
    },
    {
      id: 3,
      invoice_no: 'INV-260818-0003',
      date: '31/01/2026',
      cashier: 'Admin',
      payment: 'Cash',
      total: 20.00,
      status: 'VOID',
      items: [{ name: 'Maggi', price: 2.00, qty: 10 }]
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter((transaction) => {
    const searchValue = search.toLowerCase();
    return transaction.invoice_no.toLowerCase().includes(searchValue)
      || transaction.cashier.toLowerCase().includes(searchValue)
      || transaction.payment.toLowerCase().includes(searchValue)
      || transaction.status.toLowerCase().includes(searchValue);
  });

  const openReceipt = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeReceipt = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className="transaction-layout">
        <Sidebar />
        <div className="transactions-container">
      <h1 className="page-title">Transaction History</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <SearchBar onValue={setSearch} />
      </div>

      {/* Transaction Table */}
      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>Invois Number</th>
              <th>Date&Time</th>
              <th>Cashier</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, index) => (
              <motion.tr 
                key={txn.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <td>{index + 1}</td>
                <td>{txn.invoice_no}</td>
                <td>{txn.date}</td>
                <td>{txn.cashier}</td>
                <td>{txn.payment}</td>
                <td>RM{txn.total.toFixed(2)}</td>
                <td className={`status-${txn.status.toLowerCase()}`}>{txn.status}</td>
                <td className="action-cell">
                  <motion.button 
                    className="icon-btn"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openReceipt(txn)}
                    title="Lihat Resit"
                  >
                    <Icon icon="mdi:eye" />
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

      {/* Modal Resit */}
      <ReceiptModal invoice={selectedInvoice} onClose={closeReceipt} />
    </div>
    </div>
  );
};

export default TransactionsPage;