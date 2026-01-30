import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../../components/utils/Spinner';

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login');
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">Déconnexion en cours...</p>
      </div>
    </div>
  );
};

export default Logout;