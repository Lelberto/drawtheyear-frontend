import { config } from '../../config/config';

export const GoogleAuthButton = () => {
  
  const auth = () => {
    window.location.href = `${config.apiUrl}${config.endpoints.googleAuth}`;
  }

  return (
    <button onClick={auth}>Authenticate with Google</button>
  );
}
