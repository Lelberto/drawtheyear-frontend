import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '../../hooks/query.hook';

export const LoginCallbackView = () => {

  const [ query ] = useSearchParams();
  const navigate = useNavigate();
  const { auth: { accessToken } } = useQuery();

  useEffect(() => {
    if (query.has('refreshToken')) {
      const refreshToken = query.get('refreshToken');
      accessToken(refreshToken)
        .then(() => navigate('/login/success'))
        .catch(() => navigate('/login/failure'));
    } else {
      navigate('/login/failure');
    }
  }, []);
  
  return (
    <p>Redirecting...</p>
  );
}
