import React from 'react';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Éxito</h2>
        <p className="mb-6 text-center">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};