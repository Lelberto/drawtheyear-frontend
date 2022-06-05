/** Login page */
export const LoginPage = () => {
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google?platform=web';
  }

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
}
