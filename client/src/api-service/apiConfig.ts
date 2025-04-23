import { env } from '../env';

const server = env.VITE_BACKEND_SERVER;

const ApiConfig = {

  signInUrl: `${server}/auth/sign-in`,

  registerUrl: `${server}/auth/sign-up`,

  confirmUrl: `${server}/auth/email-confirmation`,

  resendConfirmUrl: `${server}/auth/resend-email-confirmation`,

  refreshTokenUrl: `${server}/rest/user-sessions/refresh`,

  deleteAccountUrl: `${server}/rest/user-sessions/delete-account`,

  tasksUrl: `${server}/rest/tasks`,

  homeUrl: `${server}/rest/home`,

  notesUrl: `${server}/rest/notes`,

  userUrl: `${server}/rest/users`
};

export default ApiConfig;
