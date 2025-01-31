import React, { useState, useMemo, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar, message } from 'antd';
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
import Logo from '../../components/logo.tsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';


const { Sider, Header, Content } = Layout;

// 定义菜单选项类型
type MenuItemType = {
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  children?: MenuItemType[];
};

const menuItems: MenuItemType[] = [
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
    label: '人员信息管理',
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
          <Link to="normalentry">问卷加入审核</Link>
        ),
        icon: <FileTextOutlined />
      },
      {
        key: 'invitationEntry',
        label: (
          <Link to="invitationentry">邀请加入审核</Link>
        ),
        icon: <UserAddOutlined />
      },
      {
        key: 'builderAudit',
        label: (
          <Link to="builderaudit">新建筑师审核</Link>
        ),
        icon: <SolutionOutlined />
      }
    ]
  },
  {
    key: 'Settings',
    label: '系统设置',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'Setting',
        label: (
          <Link to="setting">参数配置</Link>
        ),
        icon: <ProfileOutlined />
      },
      {
        key: 'UserManage',
        label: (
          <Link to="usermanage">账号管理</Link>
        ),
        icon: <UserOutlined />
      }
    ]
  }
];

const Index: React.FC<{}> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard']);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage<typeof message>();
  const [username, setUsername] = useState<string>('');

  // 提前定义 handleLogout 函数
  const handleLogout = () => {
    // 清除 localStorage 中的用户信息
    localStorage.removeItem('username');
    // 导航到登录页面
    navigate('/login');
  };

  const logoContainerStyle = {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#ffb1b9'
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
    backgroundColor: '#ffb1b9'
  };

  const userMenu = useMemo(() => (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>个人信息</Menu.Item>
      <Menu.Item key="2" icon={<LockOutlined />}>修改密码</Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>退出登录</Menu.Item>
    </Menu>
  ), [handleLogout, navigate]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: { key: string }) => {
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

  useEffect(() => {
    const loginSuccessMessage = localStorage.getItem('loginSuccessMessage');
    if (loginSuccessMessage) {
      messageApi.success(loginSuccessMessage);
      localStorage.removeItem('loginSuccessMessage');
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [messageApi]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Sider style={siderStyle} collapsed={collapsed}>
        <div style={logoContainerStyle}>
          <Logo />
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          style={menuStyle}
          inlineCollapsed={collapsed} // 侧边栏折叠时只显示图标
          onSelect={handleMenuClick}
        />
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
          />
        </div>
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
            {/* 先显示头像 */}
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#ff6060' }}>Admin</Avatar>
            {/* 再显示用户名和下拉箭头 */}
            <Dropdown overlay={userMenu} placement="bottomRight">
              <span style={{ marginLeft: 10, color: '#fff'}}>
                {username} <DownOutlined />
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