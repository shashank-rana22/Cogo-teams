import { useLensRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import { MAIL_FOLDER_OPTIONS } from '../constants/MAIL_CONSTANT';

const PAGE_LIMIT = 10;
const NEXT_PAGE_COUNT = 1;
const DEFAULT_NO_OF_MAILS = 0;
const DEFAULT_PAGE_NUMBER = 1;
const MIN_HEIGHT_FOR_API_CALL = 50;

const getParams = ({ senderMail = '', activeSelect = '', page = '' }) => ({
	page,
	email_address : senderMail,
	page_limit    : PAGE_LIMIT,
	foldername    : MAIL_FOLDER_OPTIONS[activeSelect],
});

function useListMail({
	activeSelect = '',
	senderMail = '',
}) {
	const [listData, setListData] = useState({ value: [], isLastPage: false });
	const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);

	const [{ loading }, trigger] = useLensRequest({
		url    : '/list_mails',
		method : 'get',
	}, { manual: true });

	const getEmails = useCallback(async ({ page }) => {
		try {
			const res = await trigger({
				params: getParams({ senderMail, activeSelect, page }),
			});

			setPagination(page);

			if (res.data) {
				const { value = [] } = res.data || {};
				const isLastPage = (value.length || DEFAULT_NO_OF_MAILS) < PAGE_LIMIT;

				setListData((prev) => ({
					value: [...(prev.value || []), ...(value || [])],
					isLastPage,
				}));
			}
		} catch (err) {
			console.error(err);
		}
	}, [activeSelect, trigger, senderMail]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;

		const reachBottom = scrollTop + clientHeight + MIN_HEIGHT_FOR_API_CALL >= scrollHeight;

		if (reachBottom && !loading && !listData?.isLastPage) {
			getEmails({ page: pagination + NEXT_PAGE_COUNT });
		}
	};

	const handleRefresh = useCallback(() => {
		setListData({ value: [], isLastPage: false });
		getEmails({ page: DEFAULT_PAGE_NUMBER });
	}, [getEmails]);

	useEffect(() => {
		getEmails({ page: DEFAULT_PAGE_NUMBER });
	}, [getEmails]);

	return {
		listData,
		handleScroll,
		loading,
		handleRefresh,
		pagination,
	};
}

export default useListMail;
