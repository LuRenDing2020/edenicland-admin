import React, { useEffect, useState } from 'react';
import { Card, Typography, Input, Button, Form } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

// 从环境变量中获取后端 API 地址
const API_BASE_URL = 'http://localhost:5000';

// 定义设置数据的类型
interface SettingsData {
  minecraftServerIP: string;
  mcsmApiAddress: string;
  emailServiceHost: string;
  mcsmDaemonId: string;
  emailServicePort: string;
  mcsmInstanceId: string;
  emailServiceUsername: string;
  mcsmApikey: string;
  emailServicePassword: string;
}

const Setting: React.FC = () => {
  const { Title } = Typography;
  const [form] = Form.useForm<SettingsData>();
  const [settingsData, setSettingsData] = useState<SettingsData>({} as SettingsData);
  const [messageApi, contextHolder] = message.useMessage();

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
    width: '100%',
  };

  // 输入框样式
  const inputStyle: React.CSSProperties = {
    width: '350px', // 输入框宽度为 350px
  };

  // 表单行样式，用于实现两列布局
  const formRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '30px', // 调整两列输入框之间的间距为 20px
  };

  // 按钮容器样式
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex - start',
    gap: '10px',
  };

  // 重新获取设置数据
  const fetchSettingsData = async () => {
    try {
      const response: AxiosResponse<SettingsData> = await axios.get(`${API_BASE_URL}/settings/get`);
      setSettingsData(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      messageApi.error('获取设置数据失败');
    }
  };

  // 组件挂载时获取设置数据
  useEffect(() => {
    fetchSettingsData();
  }, []);

  // 表单提交处理函数
  const onFinish = async (values: SettingsData) => {
    try {
      // 发送 POST 请求到后端保存设置的接口
      const response: AxiosResponse<{ message: string }> = await axios.post(`${API_BASE_URL}/settings/save`, values);
      // 显示保存成功的消息
      messageApi.success(response.data.message);
    } catch (error) {
      // 显示保存失败的消息
      messageApi.error('保存失败');
    }
  };

  return (
    <>
      {contextHolder}
      <div style={containerStyle}>
        <Card bordered={false} style={cardStyle}>
          <Title level={3} style={{ margin: 0 }}>
            参数配置
          </Title>
          <Form
            form={form}
            name="systemSettingsForm"
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: 10 }}
            initialValues={settingsData}
          >
            {/* 第一行输入框 */}
            <div style={formRowStyle}>
              {/* 左列第一个输入框 */}
              <Form.Item
                name="minecraftServerIP"
                label="Minecraft 服务器 IP 地址"
                rules={[
                  {
                    required: true,
                    message: '请输入 Minecraft 服务器 IP 地址',
                  },
                ]}
              >
                <Input placeholder="请输入服务器 IP 地址" style={inputStyle} />
              </Form.Item>
              {/* 右列第一个输入框 */}
              <Form.Item
                name="mcsmApiAddress"
                label="MCSM API 地址"
                rules={[
                  {
                    required: true,
                    message: '请输入 API 地址',
                  },
                ]}
              >
                <Input placeholder="请输入 API 地址" style={inputStyle} />
              </Form.Item>
            </div>

            {/* 第二行输入框 */}
            <div style={formRowStyle}>
              {/* 左列第二个输入框 */}
              <Form.Item
                name="emailServiceHost"
                label="邮件服务主机"
                rules={[
                  {
                    required: true,
                    message: '请输入邮件服务主机地址',
                  },
                ]}
              >
                <Input placeholder="请输入邮件服务主机地址" style={inputStyle} />
              </Form.Item>
              {/* 右列第二个输入框 */}
              <Form.Item
                name="mcsmDaemonId"
                label="MCSM Daemon ID"
                rules={[
                  {
                    required: true,
                    message: '请输入 Daemon ID',
                  },
                ]}
              >
                <Input placeholder="请输入 Daemon ID" style={inputStyle} />
              </Form.Item>
            </div>

            {/* 第三行输入框 */}
            <div style={formRowStyle}>
              {/* 左列第三个输入框 */}
              <Form.Item
                name="emailServicePort"
                label="邮件服务端口"
                rules={[
                  {
                    required: true,
                    message: '请输入邮件服务端口',
                  },
                ]}
              >
                <Input placeholder="请输入邮件服务端口" style={inputStyle} />
              </Form.Item>
              {/* 右列第三个输入框 */}
              <Form.Item
                name="mcsmInstanceId"
                label="MCSM Insatance ID"
                rules={[
                  {
                    required: true,
                    message: '请输入 Insatance ID',
                  },
                ]}
              >
                <Input placeholder="请输入 Insatance ID" style={inputStyle} />
              </Form.Item>
            </div>

            {/* 第四行输入框 */}
            <div style={formRowStyle}>
              {/* 左列第四个输入框 */}
              <Form.Item
                name="emailServiceUsername"
                label="邮件服务用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入邮件服务用户名',
                  },
                ]}
              >
                <Input placeholder="请输入邮件服务用户名" style={inputStyle} />
              </Form.Item>
              {/* 右列第四个输入框 */}
              <Form.Item
                name="mcsmApikey"
                label="MCSM APIKEY"
                rules={[
                  {
                    required: true,
                    message: '请输入 APIKEY',
                  },
                ]}
              >
                <Input.Password placeholder="请输入 APIKEY" style={inputStyle} />
              </Form.Item>
            </div>

            {/* 第五行输入框 */}
            <div style={formRowStyle}>
              {/* 左列第五个输入框 */}
              <Form.Item
                name="emailServicePassword"
                label="邮件服务密码"
                rules={[
                  {
                    required: true,
                    message: '请输入邮件服务密码',
                  },
                ]}
              >
                <Input.Password placeholder="请输入邮件服务密码" style={inputStyle} />
              </Form.Item>
            </div>

            <div style={buttonContainerStyle}>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Setting;