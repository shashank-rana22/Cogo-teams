/* eslint-disable react-hooks/exhaustive-deps */
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
	isClassified = false,
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
						includes: [
							'id',
							'subject',
							'body_preview',
							'sender',
							'received_time',
							'message_id',
							'attachments_attachment_id',
						],
						page_no    : page,
						page_limit : page_limit || 10,
						filters    : JSON.stringify({ ...(filters || {}), q }),
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [JSON.stringify(filters), page, page_limit, search, triggerGetMail]);

	useEffect(() => {
		getEmails();
	}, [getEmails, isClassified, email_address]);

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
