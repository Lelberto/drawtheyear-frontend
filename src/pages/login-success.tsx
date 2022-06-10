import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

/**
 * Login success page
 * 
 * This page is used as callback for authentication.
 */
export const LoginSuccessPage = () => {
  const auth = useContext(AuthContext);
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (queryParams.has('refreshToken')) {
      const refreshToken = queryParams.get('refreshToken');
      auth.updateTokens(refreshToken).then(() => {
        auth.refreshAuthUser().then(() => {
          navigate('/', { replace: true })
        }).catch(console.error);
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
