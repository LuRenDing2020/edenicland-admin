import React, { useState } from 'react';
import { Card, Typography, Input, Button, Form, message } from 'antd';

const Setting: React.FC = () => {
  const { Title } = Typography;

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
    maxWidth: '25%', // 输入框最大宽度不超过页面的四分之一
  };

  // 按钮容器样式
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start', // 按钮靠左对齐
    gap: '10px', // 按钮之间的间距为 10px
  };

  // 表单提交处理函数
  const onFinish = (values: any) => {
    console.log('表单提交数据:', values);
    message.success('设置保存成功');
  };

  // 获取表单实例
  const [form] = Form.useForm();

  return (
    <div style={containerStyle}>
      <Card bordered={false} style={cardStyle}>
        <Title level={3} style={{ margin: 0 }}>
          系统设置
        </Title>
        <Form
          form={form} // 绑定表单实例
          name="systemSettingsForm"
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: 20 }}
        >
          {/* Minecraft 服务器 IP 地址设置 */}
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

          {/* 邮件服务设置 */}
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

          <div style={buttonContainerStyle}>
            <Button type="primary" htmlType="submit">
              保存设置
            </Button>
            <Button type="default" htmlType="button" onClick={() => {
              // 重置表单
              form.resetFields();
            }}>
              重置
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Setting;