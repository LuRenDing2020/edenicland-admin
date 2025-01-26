// src/router/index.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/dashboard.tsx';
import Index from '../pages/system/index.tsx';

import OnlineManage from '../pages/servermanage/onlinemanage.tsx';
import Terminal from '../pages/servermanage/terminal.tsx';

import BuilderManage from '../pages/infomanage/buildermanage.tsx';
import PlayerManage from '../pages/infomanage/playermanage.tsx';

import BuilderAudit from '../pages/auditsystem/builderaudit.tsx';
import InvitationEntry from '../pages/auditsystem/invitationentry.tsx';
import NormalEntry from '../pages/auditsystem/normalentry.tsx';

import Setting from '../pages/system/setting.tsx';
import UserManage from '../pages/system/usermanage.tsx';

import Login from '../pages/system/login.tsx'; // 假设登录页面组件路径

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* 将登录页面设置为根路径的默认路由 */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/index" element={<Index />}>
                {/* 将dashboard设置为/index路径下的默认子路由 */}
                <Route index element={<Dashboard />} />
                {/* 仪表盘路由 */}
                <Route path="dashboard" element={<Dashboard />} />
                {/* 服务器管理相关路由 */}
                <Route path="terminal" element={<Terminal />} />
                <Route path="onlinemanage" element={<OnlineManage />} />
                {/* 信息管理相关路由 */}
                <Route path="playermanage" element={<PlayerManage />} />
                <Route path="buildermanage" element={<BuilderManage />} />
                {/* 审核系统相关路由 */}
                <Route path="normalentry" element={<NormalEntry />} />
                <Route path="invitationentry" element={<InvitationEntry />} />
                <Route path="builderaudit" element={<BuilderAudit />} />
                {/* 系统设置相关路由 */}
                <Route path="setting" element={<Setting />} />
                <Route path="usermanage" element={<UserManage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;