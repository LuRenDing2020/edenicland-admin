import React from 'react';
import { Drawer } from 'antd';
import { Player } from '../pages/infomanage/buildermanage.tsx';

type BuilderDetailDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  detailBuilder: Player | null;
};

const BuilderDetailDrawer: React.FC<BuilderDetailDrawerProps> = ({ isVisible, onClose, detailBuilder }) => {
  return (
    <Drawer
      title={detailBuilder? `建筑师详情 - ${detailBuilder.game_id}` : ''}
      placement="right"
      onClose={onClose}
      visible={isVisible}
      width={600}
    >
      {detailBuilder && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>游戏 ID</span>
            <span>{detailBuilder.game_id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>QQ</span>
            <span>{detailBuilder.qq}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Email</span>
            <span>{detailBuilder.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>权限组</span>
            <span>{detailBuilder.permission_group}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>入服日期</span>
            <span>{detailBuilder.join_date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>离开日期</span>
            <span>{detailBuilder.leave_date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>离开原因</span>
            <span>{detailBuilder.leave_reason}</span>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default BuilderDetailDrawer;