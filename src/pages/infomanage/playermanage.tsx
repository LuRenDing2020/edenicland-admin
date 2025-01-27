import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, Modal, Form, Input, message, DatePicker, Select, Drawer } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { UserOutlined, DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined, SearchOutlined, ContainerOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// 从环境变量中获取后端 API 地址
const API_BASE_URL = 'http://localhost:5000';

// 定义玩家数据类型
interface Player {
  game_id: string;
  qq: string;
  email: string;
  permission_group: 'Player' | 'Builder' | 'Admin';
  join_date: string;
  leave_date: string;
  leave_reason: string;
}

const PlayerManage: React.FC = () => {
  const { Title } = Typography;
  const { Option } = Select;

  // 容器样式
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    margin: '5px',
    padding: '5px',
  };

  // Card 样式
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    width: '100%',
  };

  // 控制添加玩家模态框的显示与隐藏
  const [isAddPlayerModalVisible, setIsAddPlayerModalVisible] = useState(false);

  // 存储玩家列表
  const [players, setPlayers] = useState<Player[]>([]);

  // 存储选中的玩家 ID
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // 控制编辑玩家模态框的显示与隐藏
  const [isEditPlayerModalVisible, setIsEditPlayerModalVisible] = useState(false);

  // 存储当前编辑的玩家信息
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);

  // 存储搜索关键字
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 控制详情 Drawer 的显示与隐藏
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);

  // 存储当前显示详情的玩家信息
  const [detailPlayer, setDetailPlayer] = useState<Player | null>(null);

  // 处理添加玩家模态框的显示
  const showAddPlayerModal = () => {
    setIsAddPlayerModalVisible(true);
  };

  // 处理添加玩家模态框的隐藏
  const handleCancelAddPlayer = () => {
    setIsAddPlayerModalVisible(false);
  };

  // 处理添加玩家表单的提交
  const handleAddPlayer = async (values: Player) => {
    try {
      const response: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/players`, values);
      if (response.status === 201) {
        message.success('玩家添加成功');
        handleCancelAddPlayer();
        // 重新获取玩家列表
        fetchPlayers();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error('游戏 ID 已存在');
      } else {
        message.error('添加玩家失败');
      }
    }
  };

  // 从后端获取玩家列表
  const fetchPlayers = async () => {
    try {
      let url = `${API_BASE_URL}/players`;
      if (searchKeyword) {
        url = `${API_BASE_URL}/players/search?keyword=${searchKeyword}`;
      }
      const response: AxiosResponse<Player[]> = await axios.get(url);
      setPlayers(response.data);
    } catch (error) {
      message.error('获取玩家列表失败');
    }
  };

  // 初始化时获取玩家列表
  useEffect(() => {
    fetchPlayers();
  }, []);

  // 处理搜索操作
  const handleSearch = () => {
    fetchPlayers();
  };

  // 处理批量删除玩家操作
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的玩家');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/players/batch-delete`, { game_ids: selectedRowKeys });
      message.success('玩家批量删除成功');
      // 重新获取玩家列表
      fetchPlayers();
      setSelectedRowKeys([]);
    } catch (error) {
      message.error('批量删除玩家失败');
    }
  };

  // 处理编辑玩家操作
  const handleEditPlayer = (player: Player) => {
    setEditPlayer(player);
    setIsEditPlayerModalVisible(true);
  };

  // 处理取消编辑玩家操作
  const handleCancelEditPlayer = () => {
    setIsEditPlayerModalVisible(false);
    setEditPlayer(null);
  };

  // 处理保存编辑玩家操作
  const handleSaveEditPlayer = async (values: Player) => {
    if (!editPlayer) return;
    try {
      const response: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/players/${editPlayer.game_id}`, values);
      if (response.status === 200) {
        message.success('玩家信息修改成功');
        handleCancelEditPlayer();
        // 重新获取玩家列表
        fetchPlayers();
      }
    } catch (error) {
      message.error('修改玩家信息失败');
    }
  };

  // 处理显示玩家详情操作
  const showPlayerDetail = (player: Player) => {
    setDetailPlayer(player);
    setIsDetailDrawerVisible(true);
  };

  // 处理关闭玩家详情 Drawer 操作
  const handleCloseDetailDrawer = () => {
    setIsDetailDrawerVisible(false);
    setDetailPlayer(null);
  };

  // 表单输入框样式
  const formItemStyle: React.CSSProperties = {
    marginBottom: 16,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
  };

  // 表格列定义
  const columns: Table.Columns<Player> = [
    {
      title: '游戏 ID',
      dataIndex: 'game_id',
      key: 'game_id',
    },
    {
      title: 'QQ',
      dataIndex: 'qq',
      key: 'qq',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '权限组',
      dataIndex: 'permission_group',
      key: 'permission_group',
    },
    {
      title: '入服日期',
      dataIndex: 'join_date',
      key: 'join_date',
    },
    {
      title: '离开日期',
      dataIndex: 'leave_date',
      key: 'leave_date',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Player) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<ContainerOutlined />}
            autoInsertSpace={false}
            onClick={() => showPlayerDetail(record)}
            style={{ marginRight: 8 }}
          >
            详情
          </Button>
          <Button
            icon={<EditOutlined />}
            autoInsertSpace={false}
            onClick={() => handleEditPlayer(record)}
            style={{ marginRight: 8 }}
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            autoInsertSpace={false}
            onClick={() => handleDeletePlayer(record.game_id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  // 处理删除玩家操作
  const handleDeletePlayer = async (game_id: string) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(`${API_BASE_URL}/players/${game_id}`);
      if (response.status === 200) {
        message.success('玩家删除成功');
        // 重新获取玩家列表
        fetchPlayers();
      }
    } catch (error) {
      message.error('删除玩家失败');
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: string[]) => {
      setSelectedRowKeys(keys);
    },
    getCheckboxProps: (record: Player) => ({
      disabled: false, // 可根据需要禁用某些行的选择
      name: record.game_id, // 使用唯一的 ID 作为 name
    }),
  };

  return (
    <div style={containerStyle}>
      <Card bordered={false} style={cardStyle}>
        <Title level={3} style={{ margin: 0 }}>
          玩家管理
        </Title>
        <Input
          placeholder="搜索玩家"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ margin: 10, width: 200 }}
          onPressEnter={handleSearch}
          suffix={<SearchOutlined onClick={handleSearch} />}
        />
        <Button
          icon={<UserOutlined />}
          onClick={showAddPlayerModal}
          style={{ margin: 10 }}
        >
          添加玩家
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
          dataSource={players}
          columns={columns}
          rowSelection={rowSelection}
          rowKey={(record: Player) => record.game_id}
          size="middle"
        />
      </Card>

      {/* 添加玩家模态框 */}
      <Modal
        title="添加玩家"
        visible={isAddPlayerModalVisible}
        onCancel={handleCancelAddPlayer}
        footer={null}
      >
        <Form
          onFinish={handleAddPlayer}
          labelAlign="left"
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 700 }}
        >
          <Form.Item
            name="game_id"
            label="游戏 ID"
            rules={[
              {
                required: true,
                message: '请输入游戏 ID',
              },
            ]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            name="qq"
            label="QQ"
            rules={[
              {
                required: true,
                message: '请输入 QQ',
              },
            ]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: '请输入 Email',
              },
            ]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            name="permission_group"
            label="权限组"
            rules={[
              {
                required: true,
                message: '请选择权限组',
              },
            ]}
            style={formItemStyle}
          >
            <Select style={inputStyle}>
              <Option value="Player">Player</Option>
              <Option value="Builder">Builder</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="join_date"
            label="入服日期"
            rules={[
              {
                required: true,
                message: '请选择入服日期',
              },
            ]}
            style={formItemStyle}
          >
            <DatePicker
              style={inputStyle}
              format="YYYY-MM-DD"
              onChange={(date) => date && date.format('YYYY-MM-DD')}
            />
          </Form.Item>
          <Form.Item
            name="leave_date"
            label="离开日期"
            style={formItemStyle}
          >
            <DatePicker
              style={inputStyle}
              format="YYYY-MM-DD"
              onChange={(date) => date && date.format('YYYY-MM-DD')}
            />
          </Form.Item>
          <Form.Item
            name="leave_reason"
            label="离开原因"
            style={formItemStyle}
          >
            <Input.TextArea style={inputStyle} />
          </Form.Item>
          <Form.Item style={formItemStyle}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑玩家模态框 */}
      <Modal
        title="编辑玩家"
        visible={isEditPlayerModalVisible}
        onCancel={handleCancelEditPlayer}
        footer={null}
      >
        <Form
          initialValues={editPlayer}
          onFinish={handleSaveEditPlayer}
          labelAlign="left"
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 700 }}
        >
          <Form.Item
            name="game_id"
            label="游戏 ID"
            rules={[
              {
                required: true,
                message: '请输入游戏 ID',
              },
            ]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            name="qq"
            label="QQ"
            rules={[
              {
                required: true,
                message: '请输入 QQ',
              },
            ]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: '请输入 Email',
              },
            ]}
            style={formItemStyle}
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            name="permission_group"
            label="权限组"
            rules={[
              {
                required: true,
                message: '请选择权限组',
              },
            ]}
            style={formItemStyle}
          >
            <Select style={inputStyle}>
              <Option value="Player">Player</Option>
              <Option value="Builder">Builder</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="join_date"
            label="入服日期"
            rules={[
              {
                required: true,
                message: '请选择入服日期',
              },
            ]}
            style={formItemStyle}
          >
            <DatePicker
              style={inputStyle}
              format="YYYY-MM-DD"
              onChange={(date) => date && date.format('YYYY-MM-DD')}
            />
          </Form.Item>
          <Form.Item
            name="leave_date"
            label="离开日期"
            style={formItemStyle}
          >
            <DatePicker
              style={inputStyle}
              format="YYYY-MM-DD"
              onChange={(date) => date && date.format('YYYY-MM-DD')}
            />
          </Form.Item>
          <Form.Item
            name="leave_reason"
            label="离开原因"
            style={formItemStyle}
          >
            <Input.TextArea style={inputStyle} />
          </Form.Item>
          <Form.Item style={formItemStyle}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 玩家详情 Drawer */}
      <Drawer
        title={detailPlayer ? `玩家详情 - ${detailPlayer.game_id}` : ''}
        placement="right"
        onClose={handleCloseDetailDrawer}
        visible={isDetailDrawerVisible}
        width={600}
      >
        {detailPlayer && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>游戏 ID</span>
              <span>{detailPlayer.game_id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>QQ</span>
              <span>{detailPlayer.qq}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>Email</span>
              <span>{detailPlayer.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>权限组</span>
              <span>{detailPlayer.permission_group}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>入服日期</span>
              <span>{detailPlayer.join_date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>离开日期</span>
              <span>{detailPlayer.leave_date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>离开原因</span>
              <span>{detailPlayer.leave_reason}</span>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default PlayerManage;