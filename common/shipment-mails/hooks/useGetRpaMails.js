import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import APIS from '../constants/apis';
import toastApiError from '../utils/toastApiError';

/**
 * @param {String} email_address Mail address to  get mails from
 * @param {String} page_limit No of records per page
 * @param {('outlook' | 'cogo_rpa')} source Source of email
 * Single utility hook to get mails from Cogo RPA using email address and folder
 */

const useGetRpaMails = ({ payload }) => {
	const { isClassified = false, email_address, source, q, filters, ...restPayload } = payload;

	const apis = APIS[source];

	const [mailApi, triggerGetMail] = useLensRequest({
		url    : `${apis.list}`,
		method : 'GET',
		params : {
			...restPayload,
			filters: JSON.stringify({ ...(filters || {}), q }),
		},
	}, { manual: true });

	const getEmails = useCallback(() => {
		(async () => {
			try {
				await triggerGetMail();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [triggerGetMail]);

	useEffect(() => {
		getEmails();
	}, [getEmails, isClassified, email_address]);

	return {
		mailApi,
		getEmails,
	};
};

export default useGetRpaMails;
