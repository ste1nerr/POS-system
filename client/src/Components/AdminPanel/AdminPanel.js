import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './AdminPanel.module.scss';
import MenuTable from '../MenuTable/MenuTable';
import OrderTable from '../OrderTable/OrderTable';
import Storage from '../Storage/Storage';
import { UserContext } from '../../context/UserContext';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('storage');

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <div className="container">
        <header>
          <p className={styles.admin_title}>Panel</p>
          <div className={styles.icons_admin}>
            <div className={styles.username}></div>
          </div>
          <Link to="/menu" className={styles.back_button}>
            menu
          </Link>
        </header>

        <div className={styles.under_title}>
          <div className={styles.left_column}>
            <p
              className={`${styles.admin_categorie} ${
                activeSection === 'storage' && styles.active
              }`}
              onClick={() => handleSectionClick('storage')}
            >
              storage
            </p>

            <p
              className={`${styles.admin_categorie} ${
                activeSection === 'menu' && styles.active
              }`}
              onClick={() => handleSectionClick('menu')}
            >
              menu
            </p>

            <p
              className={`${styles.admin_categorie} ${
                activeSection === 'order' && styles.active
              }`}
              onClick={() => handleSectionClick('order')}
            >
              order
            </p>

            <p
              className={`${styles.admin_categorie} ${
                activeSection === 'analytics' && styles.active
              }`}
              onClick={() => handleSectionClick('analytics')}
            >
              analytics
            </p>
          </div>
          <div className={styles.categorie_modes}>
            {activeSection === 'storage' && <Storage />}
            {activeSection === 'menu' && <MenuTable />}
            {activeSection === 'order' && <OrderTable />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
