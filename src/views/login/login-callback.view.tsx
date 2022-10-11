import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LocalStorageKey } from '../../types/local-storage.types';

export const LoginCallbackView = () => {

  const [ query ] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.has('accessToken') && query.has('refreshToken')) {
      const accessToken = query.get('accessToken');
      const refreshToken = query.get('refreshToken');
      storeTokens(accessToken, refreshToken);
      navigate('/login/success');
    } else {
      navigate('/login/failure');
    }
  }, []);

  const storeTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshToken);
  }
  
  return (
    <p>Redirecting...</p>
  );
}
