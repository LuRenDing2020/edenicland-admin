// src/app.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router/index.tsx';
import { ConfigProvider } from 'antd';

// 提取主题配置到一个单独的对象中
const themeConfig = {
  token: {
    // Seed Token，影响范围大
    colorPrimary: '#ff6060',
    colorInfo: '#ff6060',
    borderRadius: 6,
  },
};

const App: React.FC = () => (
  <Router>
    <ConfigProvider theme={themeConfig}>
      <AppRoutes />
    </ConfigProvider>
  </Router>
);

export default App;