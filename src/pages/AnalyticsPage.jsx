import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../css/AnalyticsPage.css';
import Sidebar from '../component/Sidebar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,CartesianGrid } from 'recharts'
import '../css/AnalyticsPage.css';
import {useDashboard} from '../hooks/useDashboard';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('ALL');
  const [startDate,setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null)
   const { data: dashboard, isLoading, isError, error } = useDashboard(timeRange,startDate,endDate);
 

 
  const filters = ['ALL','Today','weekly', 'This month','custom_date'];

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
          { filters.map((filter) => (
            <button
              key={filter}
              className={`filter-tab ${timeRange === filter ? 'active' : ''}`}
              onClick={() => setTimeRange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        {timeRange == 'custom_date'?(
          <div className="date-filter">
          <span className="date-label">Date:</span>
          <input onChange={(e)=> setStartDate(e.target.value)} type="date"  className="date-input" />
          <span className="dash">—</span>
          <input onChange={(e)=> setEndDate(e.target.value)} type="date"  className="date-input" />
        </div>
        ):
        (
          <span></span>
        )

        }
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards-container">
        <motion.div className="kpi-card blue" whileHover={{ scale: 1.02 }}>
          <h3>GROSS SALE</h3>
          {isLoading ?
          <p>loadig....</p>:
              <p>RM{dashboard?.kpiData?.[0]?.grandTotal}</p>
          }
          
        </motion.div>
        <motion.div className="kpi-card green" whileHover={{ scale: 1.02 }}>
          <h3>NET PROFIT</h3>
          {isLoading ?
          <p>loadig....</p>:
              <p>RM{dashboard?.kpiData?.[0]?.netProfit}</p>
          }
        </motion.div>
        <motion.div className="kpi-card orange" whileHover={{ scale: 1.02 }}>
          <h3>TRANSACTION</h3>
         {isLoading ?
          <p>loadig....</p>:
              <p>{dashboard?.kpiData?.[0]?.transactions}</p>
          }
        </motion.div>
        <motion.div className="kpi-card purple" whileHover={{ scale: 1.02 }}>
          <h3>AVERAGE RECEIPT</h3>
         {isLoading ?
          <p>loadig....</p>:
              <p>RM{parseFloat(dashboard?.kpiData?.[0]?.avg_receipt).toFixed(2)}</p>
          }
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
       {!dashboard?.chart ? (
        <p>loading.....</p>
       ):
        <ResponsiveContainer width="100%" height={400}>
  <LineChart data={dashboard?.chart}>
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
            
       }
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
              {dashboard?.bestSelling?.map((item, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item?.name}</td>
                  <td>{`${item?.sold} ${item?.unit}`}</td>
                  <td>{item?.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Card */}
        <div className="low-stock-card">
          <h2 className="low-stock-title">Low Stock</h2>
          {dashboard?.lowStock.map((item, index) => (
            <div key={index} className="low-stock-row">
              <span className="stock-dot"></span>
              <span className="stock-text">
                {item?.name} <span className="stock-info">(stock:{item.stock_quantity} | Min:{item.min_stock})</span>
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