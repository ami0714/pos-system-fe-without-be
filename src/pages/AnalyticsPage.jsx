import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/AnalyticsPage.css';
import Sidebar from '../component/Sidebar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,CartesianGrid } from 'recharts'
import '../css/AnalyticsPage.css';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('Today');

  // Dummy Data dari API
  const chartData = [
    { time: '8AM', sales: 10 },
    { time: '10AM', sales: 20 },
    { time: '12PM', sales: 30 },
    { time: '2PM', sales: 100 },
    { time: '4PM', sales: 50 },
  ];

  const bestSellers = [
    { no: 1, name: 'Magii', unit: 'pcs', jualan: 'RM1234' },
    { no: 2, name: 'Coca-Cola', unit: 'pcs', jualan: 'RM1234' },
    { no: 3, name: 'Biskut', unit: 'pcs', jualan: 'RM1234' },
    { no: 4, name: 'Minyak Masak', unit: 'botol', jualan: 'RM1234' },
    { no: 5, name: 'Gula', unit: 'kg', jualan: 'RM1234' },
  ];

  const lowStockItems = [
    { name: 'maggie', stock: 0, min: 10 },
    { name: 'maggie', stock: 0, min: 10 },
    { name: 'maggie', stock: 0, min: 10 },
  ];

  const filters = ['Today', 'Yesterday', '7 days', 'This month'];

  return (
    <div className="analytic-layout">
        <Sidebar />
    <motion.div 
      className="analytics-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="page-title">ANALYTICS & REPORTS</h1>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tab ${timeRange === filter ? 'active' : ''}`}
              onClick={() => setTimeRange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="date-filter">
          <span className="date-label">Date:</span>
          <input type="date" defaultValue="2026-08-01" className="date-input" />
          <span className="dash">—</span>
          <input type="date" defaultValue="2026-08-20" className="date-input" />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards-container">
        <motion.div className="kpi-card blue" whileHover={{ scale: 1.02 }}>
          <h3>GROSS SALE</h3>
          <p>RM1234</p>
        </motion.div>
        <motion.div className="kpi-card green" whileHover={{ scale: 1.02 }}>
          <h3>NET PROFIT</h3>
          <p>RM1234</p>
        </motion.div>
        <motion.div className="kpi-card orange" whileHover={{ scale: 1.02 }}>
          <h3>TRANSACTION</h3>
          <p>RM1234</p>
        </motion.div>
        <motion.div className="kpi-card purple" whileHover={{ scale: 1.02 }}>
          <h3>AVERAGE RECEIPT</h3>
          <p>RM1234</p>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />  
    <XAxis 
      dataKey="time" 
      tick={{ fontSize: 12, fill: '#666' }} // display nilai pada X
      label={{ value: 'TIME', position: 'insideBottomRight', offset: -10 }}
    />
    <YAxis 
      tick={{ fontSize: 12, fill: '#666' }} // display nilai pada Y
      label={{ value: 'TOTAL SALES (RM)', angle: -90, position: 'insideLeft' }}
    />
    <Tooltip />
    <Line 
      type="monotone" 
      dataKey="sales" 
      stroke="#8884d8" 
      strokeWidth={3} 
      dot={{ r: 5 }} 
      activeDot={{ r: 8 }}
    />
  </LineChart>
</ResponsiveContainer>
      </div>

      {/* Bottom Section: Best Sellers & Low Stock */}
      <div className="bottom-section">
        {/* Best-Selling Products Table */}
        <div className="best-sellers">
          <h2 className="section-title">BEST-SELLING PRODUCTS (Top 5)</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>Product name</th>
                <th>Unit</th>
                <th>Jualan</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((item, index) => (
                <tr key={index}>
                  <td>{item.no}</td>
                  <td>{item.name}</td>
                  <td>{item.unit}</td>
                  <td>{item.jualan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Card */}
        <div className="low-stock-card">
          <h2 className="low-stock-title">Low Stock</h2>
          {lowStockItems.map((item, index) => (
            <div key={index} className="low-stock-row">
              <span className="stock-dot"></span>
              <span className="stock-text">
                {item.name} <span className="stock-info">(stock:{item.stock} | Min:{item.min})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default AnalyticsPage;