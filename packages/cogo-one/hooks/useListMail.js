import { useDebounceQuery } from '@cogoport/forms';
import { useLensRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import { MAIL_FOLDER_OPTIONS } from '../constants/mailConstants';

const PAGE_LIMIT = 10;
const NEXT_PAGE_COUNT = 1;
const DEFAULT_NO_OF_MAILS = 0;
const DEFAULT_PAGE_NUMBER = 1;
const MIN_HEIGHT_FOR_API_CALL = 50;

const getParams = ({ activeMailAddress = '', activeFolder = '', page = '', query = '', filters = {} }) => ({
	page,
	email_address : activeMailAddress,
	page_limit    : PAGE_LIMIT,
	foldername    : MAIL_FOLDER_OPTIONS[activeFolder],
	search        : query || undefined,
	filters       : JSON.stringify({
		importance : filters?.importance || undefined,
		is_read    : filters?.mail_type === 'unread' ? false : undefined,
	}),
});

function useListMail({
	activeFolder = '',
	activeMailAddress = '',
	searchQuery = '',
	appliedFilters = {},
}) {
	const [listData, setListData] = useState({ value: [], isLastPage: false });
	const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);

	const { query, debounceQuery } = useDebounceQuery();

	const [{ loading }, trigger] = useLensRequest({
		url    : '/list_mails',
		method : 'get',
	}, { manual: true });

	const getEmails = useCallback(async ({ page }) => {
		try {
			const res = await trigger({
				params: getParams({
					activeMailAddress,
					activeFolder,
					page,
					query,
					filters: appliedFilters,
				}),
			});

			setPagination(page);

			if (res.data) {
				const { value = [] } = res.data || {};
				const isLastPage = (value.length || DEFAULT_NO_OF_MAILS) < PAGE_LIMIT;

				setListData((prev) => ({
					value: [...(prev?.value || []), ...(value || [])],
					isLastPage,
				}));
			}
		} catch (err) {
			console.error(err);
		}
	}, [trigger, activeMailAddress, activeFolder, query, appliedFilters]);

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
		debounceQuery(searchQuery);
	}, [debounceQuery, searchQuery]);

	useEffect(() => {
		handleRefresh();
	}, [handleRefresh]);

	return {
		listData,
		handleScroll,
		loading,
		handleRefresh,
		pagination,
	};
}

export default useListMail;
