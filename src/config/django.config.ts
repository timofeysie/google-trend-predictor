/* eslint-disable prettier/prettier */
export default () => ({
  apiUrl:
    process.env.DJANGO_API_URL || 'https://drf-two-eb17ecbff99f.herokuapp.com',
  authRefreshEndpoint: '/dj-rest-auth/token/refresh/',
});
