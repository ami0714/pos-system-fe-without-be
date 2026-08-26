import { useState } from 'react'
import { motion } from 'framer-motion'
import {Icon} from '@iconify/react'
import {useNavigate,useLocation} from 'react-router-dom';
import './Sidebar.css'

const menuItems = [
  { icon: <Icon icon="hugeicons:cashier"/>, label: '(POS)',navigate:'/pos' },
  { icon: <Icon icon="ix:product" />, label: 'Product',navigate:'/product' },
  { icon: <Icon icon="lets-icons:in" />, label: 'Stok In',navigate:'/stock' },
  { icon: <Icon icon="material-symbols:analytics" />, label: 'Analytics',navigate:'/analytics' },
  { icon: <Icon icon="icon-park-outline:transaction" />, label: 'Transaction',navigate:'/TransactionsPage' },
]

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(menuItems[0].label)

  const handleNav = (menu,navigateTo) =>{
    setActiveItem(menu);
     if( navigateTo){
      navigate(navigateTo)
     }
     setActiveItem(menuItems[0].label)

  }

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true"><Icon icon="teenyicons:shop-solid"/></div>
        <div>
          <p className="brand-name">KEDAI RUNCIIT</p>
          <p className="brand-version">POS System v1.0</p>
        </div>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav" aria-label="Navigasi utama">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.navigate;

          return (
            <motion.button
              className={`sidebar-link${isActive ? ' is-active' : ''}`}
              key={item.label}
              type="button"
              onClick={() => handleNav(item.label,item.navigate)}
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <div className="user-profile">
          <span className="user-avatar" aria-hidden="true"><Icon icon="mdi:user"/></span>
          <div>
            <p className="user-name">Admin</p>
            <p className="user-role">Boss</p>
          </div>
        </div>
        <motion.button
          className="logout-button"
          type="button"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="sidebar-icon" aria-hidden="true"><Icon icon="solar:logout-outline"/></span>
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default Sidebar
