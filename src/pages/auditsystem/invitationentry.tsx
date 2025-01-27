import React from 'react';
import { Card, Typography } from 'antd';

const InvitationEntry: React.FC  = () => {
  const { Title } = Typography;

  // 容器样式
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '90vh',
    margin: '5px',
    padding: '5px',
  };

  // Card 样式
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <Card
        bordered={false}
        style={cardStyle}
      >
        <Title level={3} style={{ margin: 0 }}>EdenicLand 邀请加入审核</Title>
        <p>瞎几把乱写的垃圾管理系统，完善中……</p>
        </Card>
      </div>
  );
};

export default InvitationEntry;