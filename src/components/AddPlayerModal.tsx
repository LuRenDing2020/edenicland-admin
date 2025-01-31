import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { Player } from '../pages/infomanage/playermanage.tsx';

const { Option } = Select;

const formItemStyle: React.CSSProperties = {
  marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
};

type AddPlayerModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onAddPlayer: (values: Player) => void;
};

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isVisible, onCancel, onAddPlayer }) => {
  return (
    <Modal
      title="添加玩家"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        onFinish={onAddPlayer}
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
            <Option value="Graduate Engineer">Graduate Engineer</Option>
            <Option value="Engineer">Engineer</Option>
            <Option value="Senior Engineer">Senior Engineer</Option>
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
  );
};

export default AddPlayerModal;