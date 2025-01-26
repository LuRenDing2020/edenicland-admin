import React from 'react';
import { Card, Checkbox, Flex, Input, Typography, Tabs, Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer.tsx';

const { Title } = Typography;
const { TabPane } = Tabs;

// 提取背景图片 URL 到常量
//1
const BACKGROUND_IMAGE_URL = 'https://img.picui.cn/free/2025/01/26/679512306bc9d.jpg'; 

// 4
// const BACKGROUND_IMAGE_URL = 'https://img.picui.cn/free/2025/01/26/6795128310a3a.jpg';

// 2
// const BACKGROUND_IMAGE_URL = 'https://img.picui.cn/free/2025/01/26/6795128360c7c.jpg';

// 3
// const BACKGROUND_IMAGE_URL = 'https://img.picui.cn/free/2025/01/26/679512837253f.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 模拟登录成功
    // 实际应用中，这里应该是登录逻辑，例如发送请求到服务器验证用户信息
    // 登录成功后导航到 Index 页面
    navigate('/index');
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // 这里可以添加登录逻辑，如发送请求到服务器进行验证
    // 示例：使用 fetch API 发送登录请求
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     // 登录成功，跳转到首页或其他页面
    //   } else {
    //     // 登录失败，显示错误信息
    //   }
    // })
    // .catch(error => {
    //   console.error('登录请求失败:', error);
    // });
  };

  // 样式部分
  const styles = `
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${BACKGROUND_IMAGE_URL});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
  }

  .login-card {
    width: 400px;
    height: 450px;
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(4px);
    overflow: auto;
  }

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-form {
    width: 350px;
    margin: 0 auto;
  }

  .sso-login {
    text-align: center;
    margin-top: 20px;
  }

  .sso-tip {
    margin: 0;
    color: #888;
    font-size: 14px;
    line-height: 30px;
  }
  `;

  // 在组件挂载时添加样式
  React.useEffect(() => {
    const addGlobalStyle = (css) => {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.head.appendChild(style);
    };
    addGlobalStyle(styles);
  }, []);

  return (
    <div className="login-container">
      <Card bordered={false} className="login-card">
        <div className="title">
          <Title level={2} style={{ marginBottom: 0 }}>EdenicLand 管理系统</Title>
          <p>瞎几把乱写的垃圾管理系统</p>
        </div>
        <Tabs defaultActiveKey="1" centered>
          {/* 账号登录 Tab */}
          <TabPane tab="账号密码登录" key="1">
            <Form
              name="login"
              initialValues={{ remember: true }}
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住密码</Checkbox>
                  </Form.Item>
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          {/* 其他登录方式 Tab */}
          <TabPane tab="SSO登录" key="2">
            <div className="sso-login">
              <p>使用 SAKURAWORKSHOP · SSO 一键登录</p>
              <Button block type="primary" onClick={handleLogin}>登录</Button>
              <p className="sso-tip">该功能正在施工中，敬请期待</p>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      <footer style={{
      margin: 0,
      padding: '2px 0', // 增加一些内边距
      position: 'fixed',
      bottom: 0,
      width: '100%',
      textAlign: 'center',
      color: '#fff',
      fontSize: '14px',
      lineHeight: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // 响应式设计：在小屏幕上调整字体大小
      '@media (max-width: 600px)': {
        fontSize: '12px'
      }
    }}>
      © 2025 EdenicLand, SAKURAWORKSHOP. All rights reserved.
    </footer>
    </div>
  );
};

export default Login;