import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

/**
 * Single utility hook to get mail from Cogo RPA using id of email
*/

const useGetMail = ({ payload }) => {
	const { email_address, message_id, mail_id } = payload;

	const [getMailApi, triggerGetMail] = useLensRequest({
		url    : 'get_mail',
		method : 'GET',
		params : {
			email_address,
			message_id,
		},
	}, { manual: true });

	const [getMailRpaApi, triggerGetRpaMail] = useLensRequest({
		url    : 'get_rpa_mail',
		method : 'GET',
		params : {
			mail_id,
		},
	}, { manual: true });

	const getRpaMail = useCallback(() => {
		(async () => {
			try {
				await triggerGetRpaMail();
			} catch (err) {
				toastApiError(err);
			}
		}
		)();
	}, [triggerGetRpaMail]);

	const getEmail = useCallback(() => {
		(async () => {
			try {
				const res = await triggerGetMail();
				if (res?.data?.error?.code === 'ErrorItemNotFound') {
					getRpaMail();
				}
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [triggerGetMail, getRpaMail]);

	useEffect(() => {
		if (message_id) {
			getEmail();
		}
	}, [message_id, getEmail]);

	return {
		getMailApi,
		getMailRpaApi,
	};
};

export default useGetMail;
