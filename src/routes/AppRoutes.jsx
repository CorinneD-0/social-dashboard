import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../utils/ProtectedRoute';

const SocialFeed = lazy(() => import('../pages/SocialFeed'));
const Analytics = lazy(() => import('../pages/Analytics'));
const AdminPanel = lazy(() => import('../pages/AdminPanel'));
const PostPlanner = lazy(() => import('../pages/PostPlanner'));
const ProfileManager = lazy(() => import('../pages/ProfileManager'));
const Profile = lazy(() => import('../pages/Profile'));
const PostDetail = lazy(() => import('../pages/PostDetail'));
const Users = lazy(() => import('../pages/Users'));
const Reports = lazy(() => import('../pages/Reports'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div style={{textAlign: 'center', marginTop: '3rem', fontSize: '1.2rem'}}>Sto caricando la pagina...<br/>Tranqui non è colpa della tua connessione! 😅</div>}>
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
          <Route path="/feed" element={<SocialFeed />} />
          <Route path="/posts" element={<PostPlanner />} />
        <Route path="/analytics" element={<Analytics />} />
          <Route path="/gestione-post" element={<ProfileManager />} />
        <Route path="/profile/:username" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
      </Route>
      
      <Route path="/post/:id" element={
        <ProtectedRoute>
          <PostDetail />
        </ProtectedRoute>
      } />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
      
        <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/dashboard" element={
        <ProtectedRoute adminOnly>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Suspense>
  );
} 