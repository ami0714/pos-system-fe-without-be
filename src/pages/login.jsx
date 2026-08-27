import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {useForm} from 'react-hook-form'
import {useLogin} from '../hooks/useLogin';
import '../css/login.css';

const LoginPage = () => {
  const { register: loginForm, handleSubmit } = useForm();
  const { mutate, isPending} = useLogin();

  
 

  const handleLogin = (payload) => {
    mutate(payload);
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Bahagian Kiri: Borang */}
        <div className="login-form-section">
          <h1 className="app-title">E-inventory</h1>
          <h2 className="form-heading">Login</h2>
          
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="input-group">
              <label>email</label>
              <input 
                type="text" 
                {...loginForm('email')}
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                placeholder=""
              />
            </div>

            <div className="input-group">
              <label>password</label>
              <input 
                type="password" 
                {...loginForm('password')}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                placeholder=""
              />
            </div>
            
            <motion.button 
              type="submit"
              className="login-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
            >
              {isPending ? 'prosessing' :'log in'}
            </motion.button>
          </form>
        </div>

        {/* Bahagian Kanan: Ilustrasi (Placeholder) */}
        <div className="login-illustration-section">
          <div className="illustration-placeholder">
            <div className="rect rect-1"></div>
            <div className="rect rect-2"></div>
            <div className="rect rect-3"></div>
            <div className="counter">
              <div className="cashier"></div>
              <div className="monitor"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;