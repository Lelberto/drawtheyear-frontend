/** Configuration schema */
export type ConfigSchema = {
  api: {
    url: string;
    endpoints: {
      accessToken: string;
      userProfile: string;
    };
  };
}

/** Configuration */
const config: ConfigSchema = {
  api: {
    url: process.env.REACT_APP_API_URL || 'http://localhost:8080',
    endpoints: {
      accessToken: process.env.REACT_APP_API_ENDPOINT_ACCESS_TOKEN || '/auth/accessToken',
      userProfile: process.env.REACT_APP_API_ENDPOINT_USER_PROFILE || '/users/profile'
    }
  }
}

export default config;
