export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  endpoints: {
    auth: {
      google: process.env.REACT_APP_ENDPOINT_GOOGLE_AUTH || '/auth/google?platform=web'
    }
  },
  users: {
    defaultPicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  days: {
    dateFormat: 'YYYY-MM-DD',
    minYear: 2017
  }
}
