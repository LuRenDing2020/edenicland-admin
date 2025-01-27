// src/router/index.tsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

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

// 检查用户是否登录的函数
const isLoggedIn = () => {
    // 从 localStorage 中获取用户名，如果存在则认为已登录
    return localStorage.getItem('username') !== null;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* 将登录页面设置为根路径的默认路由 */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/* 保护 Index 及其子路由 */}
            <Route path="/index" element={isLoggedIn() ? <Index /> : <Navigate to="/login" />}>
                {/* 将 dashboard 设置为 /index 路径下的默认子路由 */}
                <Route index element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
                {/* 仪表盘路由 */}
                <Route path="dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
                {/* 服务器管理相关路由 */}
                <Route path="terminal" element={isLoggedIn() ? <Terminal /> : <Navigate to="/login" />} />
                <Route path="onlinemanage" element={isLoggedIn() ? <OnlineManage /> : <Navigate to="/login" />} />
                {/* 信息管理相关路由 */}
                <Route path="playermanage" element={isLoggedIn() ? <PlayerManage /> : <Navigate to="/login" />} />
                <Route path="buildermanage" element={isLoggedIn() ? <BuilderManage /> : <Navigate to="/login" />} />
                {/* 审核系统相关路由 */}
                <Route path="normalentry" element={isLoggedIn() ? <NormalEntry /> : <Navigate to="/login" />} />
                <Route path="invitationentry" element={isLoggedIn() ? <InvitationEntry /> : <Navigate to="/login" />} />
                <Route path="builderaudit" element={isLoggedIn() ? <BuilderAudit /> : <Navigate to="/login" />} />
                {/* 系统设置相关路由 */}
                <Route path="setting" element={isLoggedIn() ? <Setting /> : <Navigate to="/login" />} />
                <Route path="usermanage" element={isLoggedIn() ? <UserManage /> : <Navigate to="/login" />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;