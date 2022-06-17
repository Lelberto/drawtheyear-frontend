import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';

/**
 * Login success page
 * 
 * This page is used as callback for authentication.
 * 
 * @path /login-success
 */
export const LoginSuccessPage = () => {
  const auth = useAuth();
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (queryParams.has('refreshToken')) {
      const refreshToken = queryParams.get('refreshToken');
      auth.updateTokens(refreshToken).then(() => {
        navigate('/', { replace: true });
      }).catch(console.error);
    } else {
      navigate('/', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div>Redirecting...</div>
  );
}
