import React from 'react';
import { Table, TableProps } from 'antd';

const OnlinePlayer = () => {

  //card 2 table
  interface DataType {
    key: string;
    ID: string;
    permission: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '权限组',
      dataIndex: 'permission',
      key: 'permission',
    },
  ];

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

  
    // 表格行样式
    const customTableRowStyle: React.CSSProperties = {
      backgroundColor: '#f0f0f0',
    };
  
    // 表格样式
    const tableStyle: React.CSSProperties = {
      backgroundColor: '#f0f0f0',
    };

    
      // 分页配置
      const paginationConfig = data.length > 8 ? {
        pageSize: 8,
        total: data.length
      } : false;

  return (
    <Table<DataType>
    columns={columns}
    dataSource={data}
    size="middle"
    rowClassName={() => 'custom-table-row'}
    tableStyle={tableStyle}
    pagination={paginationConfig}
  />  
  )
}

export default OnlinePlayer;