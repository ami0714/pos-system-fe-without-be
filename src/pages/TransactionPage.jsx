import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Icon} from '@iconify/react';
import ReceiptModal from '../component/ReceiptModal'; // Import komponen resit
import SearchBar from '../component/SearchBar';
import Sidebar from '../component/Sidebar';
import '../css/TransactionPage.css';
import { useGetHistory,useGetHistoryInvoice } from '../hooks/useHistory';

const TransactionsPage = () => {
 
  const {data:transactions,isLoading:isHistory, isError:isHisErr} = useGetHistory();
  const [saleId, setSaleId] = useState(null);
  const {data:invoice,isLoading:isInvoice,isError:isInvoiceErr} = useGetHistoryInvoice(saleId);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions?.filter((transaction) => {
    const searchValue = search.toLowerCase();
    return transaction?.invoice_number?.toLowerCase().includes(searchValue)
      || transaction?.cashier?.toLowerCase().includes(searchValue)
      || transaction?.payment_method?.toLowerCase().includes(searchValue)
      || transaction?.status?.toLowerCase().includes(searchValue);
  });

  const openReceipt = (saleId) => {
    setSaleId(saleId);
    setSelectedInvoice(invoice);
  };

  const closeReceipt = () => {
    setSaleId(null);
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
            {isHistory?(
                 <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>Loading...</td>
                </tr>
              ) : filteredTransactions?.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No products found</td>
                </tr>
              ) :
            
            filteredTransactions?.map((txn, index) => (
              <motion.tr 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <td>{index + 1}</td>
                <td>{txn?.invoice_number}</td>
                <td>{txn?.created_at}</td>
                <td>{txn?.cashier}</td>
                <td>{txn?.payment_method}</td>
                <td>RM{txn?.grand_total}</td>
                <td className={`status-${txn?.status?.toLowerCase()}`}>{txn?.status}</td>
                <td className="action-cell">
                  <motion.button 
                    className="icon-btn"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openReceipt(txn?.id)}
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