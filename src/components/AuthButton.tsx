import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Shield } from 'lucide-react';
import { AUTH_CONFIG } from '../config/auth';

interface AuthButtonProps {
  onSuccess: (token: string) => void;
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ onSuccess, disabled }) => {
  const login = useGoogleLogin({
    onSuccess: (response) => onSuccess(response.access_token),
    scope: AUTH_CONFIG.scopes.gmail.join(' '),
    flow: 'implicit',
    ux_mode: 'popup',
    prompt: 'consent',
  });

  return (
    <button
      onClick={() => login()}
      disabled={disabled}
      className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 
        ${disabled 
          ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 transform'
        }
        backdrop-blur-xl shadow-lg hover:shadow-blue-500/25`}
    >
      <Mail className="w-5 h-5" />
      <span className="font-medium">Secure Sign in with Gmail</span>
      <Shield className="w-4 h-4 ml-2" />
    </button>
  );
};