import { setCookies } from 'cookies-next';

import redirect from './redirect';

const setCookieAndRedirect = (token, redirectUrl) => {
	setCookies(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, token);

	redirect({ path: redirectUrl || '/', hardRedirect: true });
};

export default setCookieAndRedirect;
