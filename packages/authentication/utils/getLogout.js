import { Toast } from '@cogoport/components';
import { authRequest } from '@cogoport/request/helpers/auth-request';
import { setCookie, getCookie } from 'cookies-next';

const NEGATIVE_INDEX = -1;

const logout = () => {
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
	authRequest.delete('/delete_user_session', { params: { token } })
		.then((res) => {
			if (!res.hasError) {
				setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', NEGATIVE_INDEX);
				// eslint-disable-next-line no-undef
				window.location.href = '/v2/login';
			} else {
				Toast.error(
					'The application has encountered an unknown error. '
					+ 'Our team is looking into this with the utmost urgency.',
					{ hideAfter: 5 },
				);
			}
		});
};

export default logout;
