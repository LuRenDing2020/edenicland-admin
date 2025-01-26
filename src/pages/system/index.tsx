import React, { useState, useMemo } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import {
  DashboardOutlined,
  CloudServerOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  CodeOutlined,
  AuditOutlined,
  DatabaseOutlined,
  TeamOutlined,
  UserAddOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
  BuildOutlined,
  FileTextOutlined,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const menuItems = [
  // 一、仪表盘
  {
    key: 'dashboard',
    label: (
      <Link to="dashboard">仪表盘</Link>
    ),
    icon: <DashboardOutlined />
  },
  // 二、服务器管理
  {
    key: 'serverManagement',
    label: '服务器管理',
    icon: <CloudServerOutlined />,
    children: [
      {
        key: 'terminal',
        label: (
          <Link to="terminal">终端</Link>
        ),
        icon: <CodeOutlined />
      },
      {
        key: 'onlineManagement',
        label: (
          <Link to="onlinemanage">在线管理</Link>
        ),
        icon: <DatabaseOutlined />
      }
    ]
  },
  // 三、信息管理
  {
    key: 'infoManage',
    label: '信息管理',
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: 'playerManage',
        label: (
          <Link to="playermanage">玩家管理</Link>
        ),
        icon: <TeamOutlined />
      },
      {
        key: 'builderManage',
        label: (
          <Link to="buildermanage">建筑师管理</Link>
        ),
        icon: <BuildOutlined />
      }
    ]
  },
  // 四、审核系统
  {
    key: 'auditSystem',
    label: '审核系统',
    icon: <AuditOutlined />,
    children: [
      {
        key: 'normalEntry',
        label: (
          <Link to="normalentry">常规入服</Link>
        ),
        icon: <FileTextOutlined />
      },
      {
        key: 'invitationEntry',
        label: (
          <Link to="invitationentry">邀请入服</Link>
        ),
        icon: <UserAddOutlined />
      },
      {
        key: 'builderAudit',
        label: (
          <Link to="builderaudit">建筑师审核</Link>
        ),
        icon: <SolutionOutlined />
      }
    ]
  },
  // {
  //   key: 'setting',
  //   label: (
  //     <Link to="setting">系统设置</Link>
  //   ),
  //   icon: <SettingOutlined />
  // },
  {
    key: 'Settings',
    label: '审核系统',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'Setting',
        label: (
          <Link to="setting">配置</Link>
        ),
        icon: <ProfileOutlined />
      },
      {
        key: 'UserManage',
        label: (
          <Link to="usermanage">用户管理</Link>
        ),
        icon: <ProfileOutlined />
      }
    ]
  }
];

const Index: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard']);
  const navigate = useNavigate();

  const logoContainerStyle = {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  };

  const siderStyle = {
    width: 300,
    backgroundColor: '#fff'
  };

  const menuStyle = {
    paddingTop: 0,
  };

  const headerStyle = {
    height: 64, // 与 logo 区同高度
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20, // 左侧间距
    justifyContent: 'space-between', // 两端对齐
    backgroundColor: '#fff'
  };

  const userMenu = useMemo(() => (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>个人信息</Menu.Item>
      <Menu.Item key="2" icon={<LockOutlined />}>修改密码</Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => navigate('/login')}>退出登录</Menu.Item>
    </Menu>
  ), [navigate]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
    switch (e.key) {
      case 'terminal':
        navigate('terminal');
        break;
      case 'onlineManagement':
        navigate('onlinemanage');
        break;
      case 'playerManage':
        navigate('playermanage');
        break;
      case 'builderManage':
        navigate('buildermanage');
        break;
      case 'normalEntry':
        navigate('normalentry');
        break;
      case 'invitationEntry':
        navigate('invitationentry');
        break;
      case 'builderAudit':
        navigate('builderaudit');
        break;
      case 'Setting':
        navigate('Setting');
        break;
      case 'UserManage':
        navigate('UserManage');
        break;
      default:
        // 其他情况，比如点击父级菜单，可以添加相应逻辑
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={siderStyle} collapsed={collapsed}>
        <div style={logoContainerStyle}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '80px', height: 'auto' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/80'; // 当图片加载失败时，显示占位图
            }}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          style={menuStyle}
          inlineCollapsed={collapsed} // 侧边栏折叠时只显示图标
          onSelect={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          {/* 伸缩按键 */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ marginRight: 10 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
            {/* 先显示头像 */}
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#ff6060' }}>Admin</Avatar>
            {/* 再显示用户名和下拉箭头 */}
            <Dropdown overlay={userMenu} placement="bottomRight">
              <span style={{ marginLeft: 10 }}>
                用户名 <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content>
          {/* 路由出口，用于渲染子路由组件 */}
          <Outlet />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;