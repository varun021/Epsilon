import React from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
