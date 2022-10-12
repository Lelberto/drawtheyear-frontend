export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  endpoints: {
    auth: {
      google: process.env.REACT_APP_ENDPOINT_GOOGLE_AUTH || '/auth/google?platform=web'
    }
  }
}