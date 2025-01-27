import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, Modal, Form, Input, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { PlusOutlined, DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

// 从环境变量中获取后端 API 地址
const API_BASE_URL = 'http://localhost:5000';

// 定义用户数据类型
interface User {
  ID: string;
  EMail: string;
  is_banned: boolean;
  password?: string;
}

const Setting: React.FC = () => {
  const { Title } = Typography;

  // 容器样式
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '90vh',
    margin: '5px',
    padding: '5px',
  };

  // TableButton 样式
  const TableButtonStyle: React.CSSProperties = {
    display: 'flex',
    marginRight: 2
  };
  // Card 样式
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    width: '100%',
  };

  // 存储用户列表
  const [users, setUsers] = useState<User[]>([]);

  // 控制添加用户模态框的显示与隐藏
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);

  // 存储选中的用户 ID
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // 控制编辑用户模态框的显示与隐藏
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);

  // 存储当前编辑的用户信息
  const [editUser, setEditUser] = useState<User>({} as User);

  // 从后端获取用户列表
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 使用 API_BASE_URL 构建请求 URL
        const response: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        message.error('获取用户列表失败');
      }
    };

    fetchUsers();
  }, []);

  // 列定义
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: '用户名',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: '邮箱',
      dataIndex: 'EMail',
      key: 'EMail',
    },
    {
      title: '状态',
      dataIndex: 'is_banned',
      key: 'is_banned',
      render: (is_banned: boolean, record: User) => (
        is_banned ? (
          <span style={{ color: 'red' }}>已封禁</span>
        ) : (
          <span style={{ color: 'green' }}>正常</span>
        )
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: User) => (
        <div>
          <Button onClick={() => handleEditUser(record)} icon={<EditOutlined />} style={{ marginRight: 8 }}>
            编辑
          </Button>
          <Button onClick={() => handleDeleteUser(record.ID)} icon={<DeleteOutlined />} style={{ marginRight: 8 }}>
            删除
          </Button>
          {record.is_banned ? (
            <Button onClick={() => handleUnbanUser(record.ID)} icon={<UnlockOutlined />} style={{ marginRight: 8 }}>
              解封
            </Button>
          ) : (
            <Button onClick={() => handleBanUser(record.ID)} icon={<LockOutlined />}>
              封禁
            </Button>
          )}
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: User) => ({
      disabled: false, // 可根据需要禁用某些行的选择
      name: record.ID, // 使用唯一的 ID 作为 name
    }),
  };

  // 处理添加用户模态框的显示
  const showAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };

  // 处理添加用户模态框的隐藏
  const handleCancelAddUser = () => {
    setIsAddUserModalVisible(false);
  };

  // 处理添加用户表单的提交
  const handleAddUser = async (values: User) => {
    try {
      // 修改请求 URL 为正确的端口号
      const response: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/register`, values);
      if (response.status === 201) {
        message.success('用户添加成功');
        // 重新获取用户列表
        const newUsersResponse: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
        setUsers(newUsersResponse.data);
      }
      setIsAddUserModalVisible(false);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error('用户 ID 已存在');
      } else {
        message.error('添加用户失败');
      }
    }
  };

  // 处理删除用户操作
  const handleDeleteUser = async (id: string) => {
    try {
      // 修改请求 URL 为正确的端口号
      const response: AxiosResponse<any> = await axios.delete(`${API_BASE_URL}/users/${id}`);
      if (response.status === 200) {
        message.success('用户删除成功');
        // 重新获取用户列表
        const newUsersResponse: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
        setUsers(newUsersResponse.data);
      }
    } catch (error) {
      message.error('删除用户失败');
    }
  };

  // 处理批量删除用户操作
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的用户');
      return;
    }

    try {
      for (const id of selectedRowKeys) {
        const response: AxiosResponse<any> = await axios.delete(`${API_BASE_URL}/users/${id}`);
        if (response.status === 200) {
          message.success(`用户 ${id} 删除成功`);
        }
      }
      // 重新获取用户列表
      const newUsersResponse: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
      setUsers(newUsersResponse.data);
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('批量删除用户失败');
    }
  };

  // 处理编辑用户操作
  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditUserModalVisible(true);
  };

  // 处理取消编辑用户操作
  const handleCancelEditUser = () => {
    setIsEditUserModalVisible(false);
  };

  // 处理保存编辑用户操作
  const handleSaveEditUser = async (values: User) => {
    try {
      const response: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/users/${editUser.ID}`, values);
      if (response.status === 200) {
        message.success('用户信息修改成功');
        // 重新获取用户列表
        const newUsersResponse: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
        setUsers(newUsersResponse.data);
        setIsEditUserModalVisible(false);
      }
    } catch (error) {
      message.error('修改用户信息失败');
    }
  };

  // 处理封禁用户操作
  const handleBanUser = async (id: string) => {
    try {
      const response: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/users/${id}/ban`);
      if (response.status === 200) {
        message.success('用户封禁成功');
        // 重新获取用户列表
        const newUsersResponse: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
        setUsers(newUsersResponse.data);
      }
    } catch (error) {
      message.error('封禁用户失败');
    }
  };

  // 处理解封用户操作
  const handleUnbanUser = async (id: string) => {
    try {
      const response: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/users/${id}/unban`);
      if (response.status === 200) {
        message.success('用户解封成功');
        // 重新获取用户列表
        const newUsersResponse: AxiosResponse<User[]> = await axios.get(`${API_BASE_URL}/users`);
        setUsers(newUsersResponse.data);
      }
    } catch (error) {
      message.error('解封用户失败');
    }
  };

  // 表单输入框样式
  const formItemStyle: React.CSSProperties = {
    marginBottom: 16,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <Card bordered={false} style={cardStyle}>
        <Title level={3} style={{ margin: 0 }}>
          用户管理
        </Title>
        <Button
          icon={<PlusOutlined />}
          onClick={showAddUserModal}
          style={{ margin: 10 }}
        >
          添加用户
        </Button>
        <Button
          icon={<DeleteOutlined />}
          onClick={handleBatchDelete}
          style={{ margin: 10 }}
          disabled={selectedRowKeys.length === 0}
        >
          批量删除
        </Button>
        <Table
          dataSource={users}
          columns={columns}
          rowSelection={rowSelection}
          rowKey={(record: User) => record.ID} // 确保每一行有唯一的 key
        />
        <Modal
          title="添加用户"
          visible={isAddUserModalVisible}
          onCancel={handleCancelAddUser}
          footer={null}
        >
          <Form
            onFinish={handleAddUser}
            labelAlign="left"
            colon={false}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700 }}
          >
            <Form.Item
              name="ID"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
              style={formItemStyle}
            >
              <Input style={inputStyle} />
            </Form.Item>
            <Form.Item
              name="EMail"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
              style={formItemStyle}
            >
              <Input style={inputStyle} />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              style={formItemStyle}
            >
              <Input type="password" style={inputStyle} />
            </Form.Item>
            <Form.Item style={formItemStyle}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="编辑用户"
          visible={isEditUserModalVisible}
          onCancel={handleCancelEditUser}
          footer={null}
        >
          <Form
            onFinish={handleSaveEditUser}
            initialValues={editUser}
            labelAlign="left"
            colon={false}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700 }}
          >
            <Form.Item
              name="ID"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
              style={formItemStyle}
            >
              <Input style={inputStyle} disabled />
            </Form.Item>
            <Form.Item
              name="EMail"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ]}
              style={formItemStyle}
            >
              <Input style={inputStyle} />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              style={formItemStyle}
            >
              <Input type="password" style={inputStyle} />
            </Form.Item>
            <Form.Item style={formItemStyle}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Setting;