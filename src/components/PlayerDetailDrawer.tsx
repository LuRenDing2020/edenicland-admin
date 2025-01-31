import React from 'react';
import { Drawer } from 'antd';
import { Player } from '../pages/infomanage/playermanage.tsx';

type PlayerDetailDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  detailPlayer: Player | null;
};

const PlayerDetailDrawer: React.FC<PlayerDetailDrawerProps> = ({ isVisible, onClose, detailPlayer }) => {
  return (
    <Drawer
      title={detailPlayer ? `玩家详情 - ${detailPlayer.game_id}` : ''}
      placement="right"
      onClose={onClose}
      visible={isVisible}
      width={600}
    >
      {detailPlayer && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>游戏 ID</span>
            <span>{detailPlayer.game_id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>QQ</span>
            <span>{detailPlayer.qq}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Email</span>
            <span>{detailPlayer.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>权限组</span>
            <span>{detailPlayer.permission_group}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>入服日期</span>
            <span>{detailPlayer.join_date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>离开日期</span>
            <span>{detailPlayer.leave_date}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>离开原因</span>
            <span>{detailPlayer.leave_reason}</span>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default PlayerDetailDrawer;