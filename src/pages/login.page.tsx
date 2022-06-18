import config from '../config/config';

/**
 * Login page
 * 
 * @path /login
 */
export const LoginPage = () => {
  
  const handleGoogleLogin = () => {
    const { api } = config;
    window.location.href = `${api.url}${api.endpoints.googleAuth}`;
  }

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
}