import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const NormalEntry = () => {
  return (
    <div style={{ justifyContent: 'center' }}>
      <div className="title">
        <Title level={2} style={{ marginBottom: 0 }}>EdenicLand 常规入服</Title>
        <p>瞎几把乱写的垃圾管理系统</p>
      </div>
    </div>
  );
};

export default NormalEntry;