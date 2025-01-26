import { Card, Typography } from 'antd';
import React from 'react';

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

    return (
        <div style={containerStyle}>
            <Card
                bordered={false}
                style={cardStyle}
            >
                <Title level={3} style={{ margin: 0 }}>你好，管理员</Title>
            </Card>
        </div>
    );
};

export default Dashboard;