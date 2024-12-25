import React from 'react';
import { useAuth } from './AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}