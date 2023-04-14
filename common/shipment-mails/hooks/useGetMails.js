import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import APIS from '../constants/apis';
import toastApiError from '../utils/toastApiError';

/**
 * @param {String} email_address Mail address to  get mails from
 * @param {String} foldername Email Folder to  get mails from
 * @param {String} page_limit Email Folder to  get mails from
 * @param {('outlook' | 'cogo_rpa')} source Source of email
 * Single utility hook to get mails from Cogo RPA using email address and folder
 */

const useGetMails = ({ payload }) => {
	const { source, filters, ...restPayload } = payload;
	const { email_address, foldername, page, search } = restPayload;

	const apis = APIS[source];

	const [mailApi, triggerGetMail] = useLensRequest({
		url    : `${apis.list}`,
		method : 'GET',
		params : {
			...restPayload,
			filters: JSON.stringify(filters),
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
	}, [email_address, foldername, page, search, getEmails]);

	return {
		mailApi,
		getEmails,
	};
};

export default useGetMails;
