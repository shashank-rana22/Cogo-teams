import useAxios from 'axios-hooks';
import { useEffect } from 'react';

/**
 * Single utility hook to get mail from Cogo RPA using id of email
 */

const useGetAttachements = (email_address, message_id) => {
	const [getAttachementsApi, triggerGetMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/get_attachments`,
			method : 'GET',
		},
		{ manual: true },
	);

	/**
	 *
	 * @param {String} id Id of mail
	 */
	const getAttachements = async () => {
		try {
			await triggerGetMail({
				params: {
					email_address,
					message_id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (message_id) {
			getAttachements();
		}
	}, [message_id]);

	return {
		getAttachementsApi,
		getAttachements,
	};
};

export default useGetAttachements;
