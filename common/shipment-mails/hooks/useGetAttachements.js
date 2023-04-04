import useAxios from 'axios-hooks';
import { useEffect, useCallback } from 'react';

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

	const getAttachements = useCallback(() => {
		(async () => {
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
		})();
	}, [triggerGetMail, email_address, message_id]);

	useEffect(() => {
		if (message_id) {
			getAttachements();
		}
	}, [message_id, getAttachements]);

	return {
		getAttachementsApi,
		getAttachements,
	};
};

export default useGetAttachements;
