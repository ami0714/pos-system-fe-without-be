import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/login';
import PosPage from './pages/pos';
import ProductListPage from './pages/product';
import ProductFormPage from './pages/AddEditt';
import StockPage from './pages/stockPage'; 
import AnalyticsPage from './pages/AnalyticsPage';
import TransactionsPage from './pages/TransactionPage';
import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthContextProvider from './context/authContext';

function App() {
  const  queryClient = new QueryClient();

  return (
    <>
     <QueryClientProvider client={queryClient} >
    <AuthContextProvider>
   
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/pos' element={<PosPage />}/>
        <Route path='/product' element={<ProductListPage/>} />
        <Route path='/productForm' element={<ProductFormPage />} />
        <Route path='/productForm/:id' element={<ProductFormPage />} />
        <Route path='/stock' element={<StockPage />} />
        <Route path='/analytics' element={<AnalyticsPage />} />
        <Route path='/TransactionsPage' element={<TransactionsPage />} />
      </Routes>
    </Router>
    
    </AuthContextProvider>
     </QueryClientProvider>
    </>
  )
}

export default App
