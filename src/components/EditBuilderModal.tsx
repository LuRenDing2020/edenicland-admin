import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { Player } from '../pages/infomanage/buildermanage.tsx';

const { Option } = Select;

const formItemStyle: React.CSSProperties = {
  marginBottom: 16,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
};

type EditBuilderModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onSaveEditBuilder: (values: Player) => void;
  editBuilder: Player | null;
};

const EditBuilderModal: React.FC<EditBuilderModalProps> = ({ isVisible, onCancel, onSaveEditBuilder, editBuilder }) => {
  return (
    <Modal
      title="编辑建筑师"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        initialValues={editBuilder}
        onFinish={onSaveEditBuilder}
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
            <Option value="Builder">Builder</Option>
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
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBuilderModal;