import useAxios from 'axios-hooks';

/**
 * Single utility hook to generate token
 */

const useGenerateToken = () => {
	const [generateTokenApi, triggerGetMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/add_outlook_account`,
			method : 'POST',
		},
		{ manual: true },
	);

	/**
	 *
	 * @param {*} id
	 */
	const generateToken = async ({ email, auth_code, scopes }) => triggerGetMail({
		data: {
			auth_code,
			email,
			scopes,
		},
	});

	return {
		generateTokenApi,
		generateToken,
	};
};

export default useGenerateToken;
