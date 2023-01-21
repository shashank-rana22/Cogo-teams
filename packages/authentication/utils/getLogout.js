import { Toast } from '@cogoport/components';
import { request } from '@cogoport/request/helpers/request';
import { setCookie, getCookie } from 'cookies-next';

const logout = () => {
	const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
	request.delete('/delete_user_session', { params: { token } })
		.then((res) => {
			if (!res.hasError) {
				setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', -1);
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
