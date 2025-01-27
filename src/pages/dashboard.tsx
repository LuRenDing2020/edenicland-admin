import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

const Dashboard = () => {
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

    // 存储当前登录用户的用户名
    const [username, setUsername] = useState('');

    // 从后端获取当前登录用户的用户名
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  });

    return (
        <div style={containerStyle}>
            <Card
                bordered={false}
                style={cardStyle}
            >
                {/* 根据用户名是否存在来显示不同的内容 */}
                <Title level={3} style={{ margin: 0 }}>
                    {username ? `Hello, dear ${username}. Welcome back to Edenicland.` : 'Hi, dear guest.'}
                </Title>
            </Card>
        </div>
    );
};

export default Dashboard;