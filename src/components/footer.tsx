import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      margin: 0,
      padding: '2px 0', // 增加一些内边距
      position: 'fixed',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      color: '#888',
      fontSize: '14px',
      lineHeight: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // 响应式设计：在小屏幕上调整字体大小
      '@media (max-width: 600px)': {
        fontSize: '12px'
      }
    }}>
      © 2025 EdenicLand, SAKURAWORKSHOP. All rights reserved.
    </footer>
  );
};

export default Footer;