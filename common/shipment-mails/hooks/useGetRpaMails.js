import useAxios from 'axios-hooks';
import { useEffect, useState, useCallback } from 'react';

import APIS from '../constants/apis';

/**
 * @param {String} email_address Mail address to  get mails from
 * @param {String} page_limit No of records per page
 * @param {('outlook' | 'cogo_rpa')} source Source of email
 * Single utility hook to get mails from Cogo RPA using email address and folder
 */

const useGetRpaMails = (
	email_address,
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
			// paramsSerializer: (params) => qs.stringify(params),
		},
		{ manual: true },
	);

	const getEmails = useCallback(() => {
		(
			async () => {
				try {
					let q;
					if (search && filters?.q) {
						q = `${filters?.q} ${search}`;
					} else if (search) {
						q = search;
					} else if (filters?.q) {
						q = `${filters?.q}`;
					}
					await triggerGetMail({
						params: {
							page_no    : page,
							page_limit : page_limit || 10,
							// filters    : JSON.stringify({ ...(filters || {}), q: 165993 }),
							// filters    : JSON.stringify({ q: 165993, foldername: 'Inbox' }),
						},
					});
				} catch (err) {
					console.log(err);
				}
			}
		)();
	}, [triggerGetMail, page_limit, JSON.stringify(filters), page, search]);

	useEffect(() => {
		getEmails();
	}, [getEmails]);

	return {
		mailApi,
		setPage,
		page,
		getEmails,
		setSearch,
		search,
	};
};

export default useGetRpaMails;
