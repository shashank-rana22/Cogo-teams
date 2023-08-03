import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 10;
const NEXT_PAGE_COUNT = 1;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_NO_OF_AGENTS = 0;
const MIN_HEIGHT_FOR_API_CALL = 10;

const getPayload = ({ page, query }) => ({
	page,
	filters: {
		status : 'active',
		q      : query || undefined,
	},
});

const useListOrganization = ({ search = '' }) => {
	const { query, debounceQuery } = useDebounceQuery();
	const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);
	const [listData, setListData] = useState({ list: [], isLastPage: false });

	const [
		{ loading }, trigger,
	] = useRequest({
		url    : '/list_organizations',
		method : 'get',
	}, { manual: true });

	const listOrganizations = useCallback(async ({ page }) => {
		try {
			const res = await trigger({
				params: getPayload({ page, query }),
			});

			setPagination(page);

			if (res.data) {
				const { list = [] } = res.data || {};
				const isLastPage = (list.length || DEFAULT_NO_OF_AGENTS) < PAGE_LIMIT;

				setListData((prev) => ({
					list: [...(prev?.list || []), ...(list || [])],
					isLastPage,
				}));
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger, query]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;

		const reachBottom = scrollTop + clientHeight + MIN_HEIGHT_FOR_API_CALL >= scrollHeight;

		if (reachBottom && !loading && !listData?.isLastPage) {
			listOrganizations({ page: pagination + NEXT_PAGE_COUNT });
		}
	};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setListData({ list: [], isLastPage: false });
		listOrganizations({ page: DEFAULT_PAGE_NUMBER });
	}, [listOrganizations]);

	return {
		listData,
		loading,
		handleScroll,
	};
};

export default useListOrganization;
