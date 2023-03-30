import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetAttachements = (email_address, message_id) => {
	const [getAttachementsApi, triggerGetMail] = useLensRequest({
		url    : 'get_attachments',
		method : 'GET',
	}, { manual: true });

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
