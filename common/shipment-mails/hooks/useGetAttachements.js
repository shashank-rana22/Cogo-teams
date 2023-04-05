import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

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
				Toast.error(getApiErrorString(err));
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
