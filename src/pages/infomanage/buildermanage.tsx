import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, message, Input } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { DeleteOutlined, EditOutlined, SearchOutlined, ContainerOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
// 引入新组件
import EditBuilderModal from '../../components/EditBuilderModal.tsx';
import BuilderDetailDrawer from '../../components/BuilderDetailDrawer.tsx';

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

const BuilderManage: React.FC = () => {
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

  // 存储建筑师列表
  const [builders, setBuilders] = useState<Player[]>([]);

  // 存储选中的建筑师 ID
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // 控制编辑建筑师模态框的显示与隐藏
  const [isEditBuilderModalVisible, setIsEditBuilderModalVisible] = useState(false);

  // 存储当前编辑的建筑师信息
  const [editBuilder, setEditBuilder] = useState<Player | null>(null);

  // 存储搜索关键字
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 控制详情 Drawer 的显示与隐藏
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);

  // 存储当前显示详情的建筑师信息
  const [detailBuilder, setDetailBuilder] = useState<Player | null>(null);

  // 获取 messageApi
  const [messageApi, contextHolder] = message.useMessage();

  // 从后端获取建筑师列表（筛选出权限组为 Graduate Engineer、Engineer 或 Senior Engineer 的玩家）
  const fetchBuilders = async () => {
    try {
      let url = `${API_BASE_URL}/players`;
      if (searchKeyword) {
        url = `${API_BASE_URL}/players/search?keyword=${searchKeyword}`;
      }
      const response: AxiosResponse<Player[]> = await axios.get(url);
      const filteredBuilders = response.data.filter(player => 
        player.permission_group === 'Graduate Engineer' || 
        player.permission_group === 'Engineer' || 
        player.permission_group === 'Senior Engineer'
      );
      setBuilders(filteredBuilders);
    } catch (error) {
      messageApi.error('获取建筑师列表失败');
    }
  };

  // 初始化时获取建筑师列表
  useEffect(() => {
    fetchBuilders();
  }, []);

  // 处理搜索操作
  const handleSearch = () => {
    fetchBuilders();
  };

  // 处理批量删除建筑师操作（将权限组变为 Player）
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请选择要删除的建筑师');
      return;
    }

    try {
      for (const game_id of selectedRowKeys) {
        const updatedPlayer: Player = {
          ...builders.find(player => player.game_id === game_id) as Player,
          permission_group: 'Player',
        };
        await axios.put(`${API_BASE_URL}/players/${game_id}`, updatedPlayer);
      }
      messageApi.success('建筑师权限组已批量修改为 Player');
      // 重新获取建筑师列表
      fetchBuilders();
      setSelectedRowKeys([]);
    } catch (error) {
      messageApi.error('批量修改建筑师权限组失败');
    }
  };

  // 处理编辑建筑师操作
  const handleEditBuilder = (builder: Player) => {
    setEditBuilder(builder);
    setIsEditBuilderModalVisible(true);
  };

  // 处理取消编辑建筑师操作
  const handleCancelEditBuilder = () => {
    setIsEditBuilderModalVisible(false);
    setEditBuilder(null);
  };

  // 处理保存编辑建筑师操作
  const handleSaveEditBuilder = async (values: Player) => {
    if (!editBuilder) return;
    try {
      // 格式化日期
      if (values.join_date && typeof values.join_date === 'string') {
        const joinDateObj = dayjs(values.join_date);
        if (joinDateObj.isValid()) {
          values.join_date = joinDateObj.format('YYYY-MM-DD');
        } else {
          messageApi.error('入服日期格式无效，请检查后重试');
          return;
        }
      }
      if (values.leave_date && typeof values.leave_date === 'string') {
        const leaveDateObj = dayjs(values.leave_date);
        if (leaveDateObj.isValid()) {
          values.leave_date = leaveDateObj.format('YYYY-MM-DD');
        } else {
          messageApi.error('离开日期格式无效，请检查后重试');
          return;
        }
      }

      const response: AxiosResponse<any> = await axios.put(`${API_BASE_URL}/players/${editBuilder.game_id}`, values);
      if (response.status === 200) {
        messageApi.success('建筑师信息修改成功');
        handleCancelEditBuilder();
        // 重新获取建筑师列表
        fetchBuilders();
      }
    } catch (error) {
      messageApi.error('修改建筑师信息失败');
    }
  };

  // 处理显示建筑师详情操作
  const showBuilderDetail = (builder: Player) => {
    setDetailBuilder(builder);
    setIsDetailDrawerVisible(true);
  };

  // 处理关闭建筑师详情 Drawer 操作
  const handleCloseDetailDrawer = () => {
    setIsDetailDrawerVisible(false);
    setDetailBuilder(null);
  };

  // 处理删除建筑师操作（将权限组变为 Player）
  const handleDeleteBuilder = async (game_id: string) => {
    try {
      const updatedPlayer: Player = {
        ...builders.find(player => player.game_id === game_id) as Player,
        permission_group: 'Player',
      };
      await axios.put(`${API_BASE_URL}/players/${game_id}`, updatedPlayer);
      messageApi.success('建筑师权限组已修改为 Player');
      // 重新获取建筑师列表
      fetchBuilders();
    } catch (error) {
      messageApi.error('修改建筑师权限组失败');
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
      title: '操作',
      key: 'action',
      render: (_, record: Player) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<ContainerOutlined />}
            autoInsertSpace={false}
            onClick={() => showBuilderDetail(record)}
            style={{ marginRight: 8 }}
          >
            详情
          </Button>
          <Button
            icon={<EditOutlined />}
            autoInsertSpace={false}
            onClick={() => handleEditBuilder(record)}
            style={{ marginRight: 8 }}
            disabled
          >
            编辑
          </Button>
          <Button
            icon={<DeleteOutlined />}
            autoInsertSpace={false}
            onClick={() => handleDeleteBuilder(record.game_id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  // 根据数据长度决定是否显示分页
  const pagination = builders.length >= 8 ? {
    pageSize: 7,  // 每页显示7条数据
  } : false;

  return (
    <>
      {contextHolder}
      <div style={containerStyle}>
        <Card bordered={false} style={cardStyle}>
          <Title level={3} style={{ margin: 0 }}>
            建筑师管理
          </Title>
          <Input
            placeholder="搜索建筑师"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ margin: 10, width: 200 }}
            onPressEnter={handleSearch}
            suffix={<SearchOutlined onClick={handleSearch} />}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={handleBatchDelete}
            style={{ margin: 10 }}
            disabled={selectedRowKeys.length === 0}
          >
            批量删除
          </Button>
          <Table
            dataSource={builders}
            columns={columns}
            rowSelection={rowSelection}
            rowKey={(record: Player) => record.game_id}
            size="middle"
            pagination={pagination} // 设置分页属性
          />
        </Card>

        {/* 编辑建筑师模态框 */}
        <EditBuilderModal
          isVisible={isEditBuilderModalVisible}
          onCancel={handleCancelEditBuilder}
          onSaveEditBuilder={handleSaveEditBuilder}
          editBuilder={editBuilder}
        />

        {/* 建筑师详情 Drawer */}
        <BuilderDetailDrawer
          isVisible={isDetailDrawerVisible}
          onClose={handleCloseDetailDrawer}
          detailBuilder={detailBuilder}
        />
      </div>
    </>
  );
};

export default BuilderManage;