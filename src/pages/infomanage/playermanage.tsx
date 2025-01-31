import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, Input, message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { DeleteOutlined, EditOutlined, SearchOutlined, ContainerOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
// 引入新组件
import AddPlayerModal from '../../components/AddPlayerModal.tsx';
import EditPlayerModal from '../../components/EditPlayerModal.tsx';
import PlayerDetailDrawer from '../../components/PlayerDetailDrawer.tsx';
// 从环境变量中获取后端 API 地址
const API_BASE_URL = 'http://localhost:5000';

// 定义玩家数据类型
interface Player {
  game_id: string;
  qq: string;
  email: string;
  permission_group: 'Player' | 'Graduate Engineer' | 'Engineer' | 'Senior Engineer' | 'Admin';
  join_date: string;
  leave_date: string;
  leave_reason: string;
}

const PlayerManage: React.FC = () => {
  const { Title } = Typography;

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

  // playermanage.tsx 中 handleAddPlayer 方法相关部分
  const handleAddPlayer = async (values: Player) => {
    try {
      // 格式化日期
      if (values.join_date && typeof values.join_date === 'object') {
        values.join_date = dayjs(values.join_date).format('YYYY-MM-DD');
      }
      if (values.leave_date && typeof values.leave_date === 'object') {
        values.leave_date = dayjs(values.leave_date).format('YYYY-MM-DD');
      }

      const response: AxiosResponse<any> = await axios.post(`${API_BASE_URL}/players`, values);
      if (response.status === 201) {
        messageApi.success('玩家添加成功');
        handleCancelAddPlayer();
        // 重新获取玩家列表
        fetchPlayers();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        messageApi.error('游戏 ID 已存在');
      } else {
        messageApi.error('添加玩家失败');
      }
    }
  };

  // 获取 messageApi
  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.error('获取玩家列表失败');
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
      messageApi.warning('请选择要删除的玩家');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/players/batch-delete`, { game_ids: selectedRowKeys });
      messageApi.success('玩家批量删除成功');
      // 重新获取玩家列表
      fetchPlayers();
      setSelectedRowKeys([]);
    } catch (error) {
      messageApi.error('批量删除玩家失败');
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

  // playermanage.tsx 中 handleSaveEditPlayer 方法相关部分
  const handleSaveEditPlayer = async (values: Player) => {
    if (!editPlayer) return;
    try {
      // 格式化日期
      if (values.join_date) {
        const joinDateObj = dayjs(values.join_date);
        if (!joinDateObj.isValid()) {
          messageApi.error('入服日期格式无效，请检查后重试');
          return;
        }
        values.join_date = joinDateObj.format('YYYY-MM-DD');
      }
      if (values.leave_date) {
        const leaveDateObj = dayjs(values.leave_date);
        if (!leaveDateObj.isValid()) {
          messageApi.error('离开日期格式无效，请检查后重试');
          return;
        }
        values.leave_date = leaveDateObj.format('YYYY-MM-DD');
      }

      const response: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/players/${editPlayer.game_id}`, values);
      if (response.status === 200) {
        messageApi.success('玩家信息修改成功');
        handleCancelEditPlayer();
        // 重新获取玩家列表
        fetchPlayers();
      }
    } catch (error) {
      messageApi.error('修改玩家信息失败');
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

  // 处理删除玩家操作
  const handleDeletePlayer = async (game_id: string) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(`${API_BASE_URL}/players/${game_id}`);
      if (response.status === 200) {
        messageApi.success('玩家删除成功');
        // 重新获取玩家列表
        fetchPlayers();
      }
    } catch (error) {
      messageApi.error('删除玩家失败');
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
            disabled
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

  // 根据数据长度决定是否显示分页
  const pagination = players.length >= 8 ? {
    pageSize: 7,  // 每页显示7条数据
  } : false;

  return (
    <>
    {contextHolder}
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
          icon={<PlusOutlined />}
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
          pagination={pagination} // 设置分页属性
        />
      </Card>

      {/* 添加玩家模态框 */}
      <AddPlayerModal
        isVisible={isAddPlayerModalVisible}
        onCancel={handleCancelAddPlayer}
        onAddPlayer={handleAddPlayer}
      />

      {/* 编辑玩家模态框 */}
      <EditPlayerModal
        isVisible={isEditPlayerModalVisible}
        onCancel={handleCancelEditPlayer}
        onSaveEditPlayer={handleSaveEditPlayer}
        editPlayer={editPlayer}
      />

      {/* 玩家详情 Drawer */}
      <PlayerDetailDrawer
        isVisible={isDetailDrawerVisible}
        onClose={handleCloseDetailDrawer}
        detailPlayer={detailPlayer}
      />
    </div>
    </>
  );
};

export default PlayerManage;