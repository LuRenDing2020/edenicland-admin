import { Alert, Card, Typography } from 'antd';
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
                <Alert message="人员信息中的编辑按钮出大问题，现已禁用，请不要使用各种方式尝试打开。请确保第一次录入信息时信息绝对正确。" type="info" style={{ margin: 10 }} showIcon />
            </Card>
        </div>
    );
};

export default Dashboard;