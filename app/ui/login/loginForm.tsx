'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { login } from '@/redux/features/carrito/carritoSlice';
import { useAppDispatch } from '@/redux/hooks';
import { ErrorModal } from './error';
import { SuccessModal } from '@/app/ui/login/success'; 
import { checkUser } from '@/app/lib/actions';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para SuccessModal
  const router = useRouter();
  const dispatchLogin = useAppDispatch();

  const handleLogin = async () => {
    const valid = await checkUser(email, password);
    switch (valid) {
      case 'USER': {
        setError('Correo electrónico incorrecto');
        setShowErrorModal(true);
        break;
      }
      case 'PASSWORD': {
        setError('Contraseña incorrecta');
        setShowErrorModal(true);
        break;
      }
      case 'VALID': {
        dispatchLogin(login());
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push('/dashboard/admin');
        }, 2000); // Retardo de 2 segundos antes de redirigir
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 mt-2"
            >
              Cerrar
            </button>
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {error && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{error}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
      {showErrorModal && <ErrorModal message={error} onClose={() => setShowErrorModal(false)} />}
      {showSuccessModal && <SuccessModal message="Iniciar sesión correctamente" onClose={() => setShowSuccessModal(false)} />} {/* Mostrar SuccessModal */}
    </>
  );
};

export default LoginForm;