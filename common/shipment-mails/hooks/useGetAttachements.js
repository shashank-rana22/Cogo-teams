import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetAttachements = ({ payload }) => {
	const { message_id = '' } = payload;

	const [getAttachementsApi, triggerGetMail] = useLensRequest({
		url    : 'get_attachments',
		method : 'GET',
		params : {
			...payload,
		},
	}, { manual: true });

	const getAttachements = useCallback(() => {
		(async () => {
			try {
				await triggerGetMail();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [triggerGetMail]);

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
