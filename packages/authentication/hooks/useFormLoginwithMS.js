import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useFormLoginwithMS = () => {
	const [responseUrl, setResponseUrl] = useState({});

	const [{ loading: socialLoginLoading }, trigger] = useRequest(
		{
			url    : '/get_user_social_login_link',
			method : 'get',
		},
		{ manual: true },
	);

	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;

		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}

		window.location.href = modifiedUrl;
	};

	const onLogin = async () => {
		try {
			const params = {
				auth_scope    : 'partner',
				auth_platform : 'microsoft',
				platform      : 'admin',
			};

			const response = await trigger({
				params,
			});

			openDocument(response.data.link);

			setResponseUrl(response);
		} catch (e) {
			console.log(e);
		}
	};

	return {
		onLogin,
		responseUrl,
		socialLoginLoading,
	};
};

export default useFormLoginwithMS;
