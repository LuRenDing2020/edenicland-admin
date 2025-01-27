import React, { useState } from 'react';
import { Button, Card, Divider, Select, Space, Table, TableProps, Typography } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import OnlinePlayer from '../../components/onlineplayer.tsx';

const OnlineManage: React.FC = () => {
  const { Title } = Typography;

  const layoutContainerStyle: React.CSSProperties = {
    display: 'flex',
    height: '90vh',
    margin: '5px',
    padding: '5px',
  };

  const leftCardStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: '#fff',
    marginRight: '10px',
  };

  const rightCardStyle: React.CSSProperties = {
    flex: 3,
    backgroundColor: '#fff',
  };

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string[]) => {
    setSelectedValues(value);
    console.log(`selected ${value}`);
  };

  const handleClear = () => {
    setSelectedValues([]);
  };

  // 选择器样式
  const selectStyle: React.CSSProperties = {
    width: '100%',
    borderColor: '#ff0000',
    backgroundColor: '#fff',
  };

  interface DataType {
    key: string;
    ID: string;
    permission: string;
  }
  
  // 确保 data 变量在使用前已经声明并初始化
  const data: DataType[] = [
    {
      key: '1',
      ID: 'Player1',
      permission: 'Admin',
    },
    {
      key: '2',
      ID: 'Player2',
      permission: 'Owner',
    },
    {
      key: '3',
      ID: 'Player3',
      permission: 'Builder',
    },
    {
      key: '4',
      ID: 'Player4',
      permission: 'Player',
    },
    {
      key: '5',
      ID: 'Player5',
      permission: 'Admin',
    },
    {
      key: '6',
      ID: 'Player6',
      permission: 'Admin',
    },
    {
      key: '7',
      ID: 'Player7',
      permission: 'Builder',
    },
    {
      key: '8',
      ID: 'Player8',
      permission: 'Builder',
    },
  ];

  // 在 data 变量声明之后声明 options 变量
  const options = data.map((item) => ({
    label: item.ID,
    value: item.ID,
    desc: item.ID,
  }));

  return (
    <div style={layoutContainerStyle}>
      {/* 左侧 Card */}
      <Card
        bordered={false}
        style={leftCardStyle}
        className="card-1"
      >
        <Title level={3} style={{ margin: 0 }}>操作</Title>
        <Divider orientation="left">服外操作</Divider>
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          <Button style={{ backgroundColor: '#52c41a', color: '#fff' }} block autoInsertSpace={false}>启动</Button>
          <Button type="primary" block ghost autoInsertSpace={false}>重启</Button>
          <Button type="primary" block autoInsertSpace={false}>关闭</Button>
        </Space>
        <Divider orientation="left">服内操作</Divider>
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          <Button type="primary" block ghost autoInsertSpace={false}>Kick All</Button>
          <Button type="primary" block ghost autoInsertSpace={false}>重载</Button>
        </Space>
        <Divider orientation="left">单个玩家操作</Divider>
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          <Select
            mode="multiple"
            style={selectStyle}
            placeholder="选择玩家，可多选"
            onChange={handleChange}
            options={options}
            value={selectedValues}
            suffixIcon={selectedValues.length > 0 && <ClearOutlined onClick={handleClear} />}
          />
          <Button type="primary" block ghost autoInsertSpace={false}>设为管理员</Button>
          <Button type="primary" block ghost autoInsertSpace={false}>Kick</Button>
          <Button type="primary" block ghost autoInsertSpace={false}>Ban</Button>
        </Space>
      </Card>
      {/* 右侧 Card */}
      <Card
        bordered={false}
        style={rightCardStyle}
        className="card-2"
      >
        <Title level={3} style={{ margin: 0 }}>状态</Title>
        <Divider orientation="left">在线玩家</Divider>
        <OnlinePlayer />
      </Card>
    </div>
  );
};

export default OnlineManage;