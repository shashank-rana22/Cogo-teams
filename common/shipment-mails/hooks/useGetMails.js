import useAxios from 'axios-hooks';
import { useEffect, useState, useCallback } from 'react';

import APIS from '../constants/apis';

/**
 * @param {String} email_address Mail address to  get mails from
 * @param {String} foldername Email Folder to  get mails from
 * @param {String} page_limit Email Folder to  get mails from
 * @param {('outlook' | 'cogo_rpa')} source Source of email
 * Single utility hook to get mails from Cogo RPA using email address and folder
 */

const useGetMails = (
	email_address,
	foldername,
	page_limit,
	source,
	filters,
) => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState(undefined);

	const apis = APIS[source];

	const [mailApi, triggerGetMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/${apis.list}`,
			method : 'GET',
		},
		{ manual: true },
	);

	const getEmails = useCallback(() => {
		(async () => {
			try {
				await triggerGetMail({
					params: {
						email_address,
						foldername,
						page,
						page_limit : page_limit || 10,
						search,
						filters    : JSON.stringify(filters),
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [email_address, foldername, page, page_limit, search, filters, triggerGetMail]);

	useEffect(() => {
		getEmails();
	}, [email_address, foldername, page, search, getEmails]);

	return {
		mailApi,
		setPage,
		page,
		getEmails,
		setSearch,
		search,
	};
};

export default useGetMails;
