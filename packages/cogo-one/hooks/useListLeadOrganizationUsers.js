import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const PAGE_LIMIT = 10;
const NEXT_PAGE_COUNT = 1;
const DEFAULT_PAGE_NUMBER = 1;
const LAST_PAGE = 0;
const MIN_HEIGHT_FOR_API_CALL = 10;

const getParams = ({ query, page }) => ({
	filters                 : query ? { q: query } : undefined,
	lead_user_data_required : true,
	agent_data_required     : true,
	page,
	page_limit              : 50,
});

const useListLeadOrganizationUsers = () => {
	const [search, setSearch] = useState('');
	const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);
	const [listData, setListData] = useState({ list: [], isLastPage: false });

	const [{ loading }, trigger] = useRequest({
		url    : '/list_lead_organization_users',
		method : 'get',
	}, { manual: true });

	const { debounceQuery, query } = useDebounceQuery();

	const getOrganizationUsers = useCallback(async ({ page }) => {
		try {
			const res = await trigger({ params: getParams({ query, page }) });
			setPagination(page);

			if (res.data) {
				const { list = [] } = res.data || {};
				const isLastPage = (list.length || LAST_PAGE) < PAGE_LIMIT;

				setListData((prev) => ({
					list: [...(prev?.list || []), ...(list || [])],
					isLastPage,
				}));
			}
		} catch (err) {
			console.error('err', err);
		}
	}, [query, trigger]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;
		const reachBottom = scrollTop + clientHeight + MIN_HEIGHT_FOR_API_CALL >= scrollHeight;
		if (reachBottom && !loading && !listData?.isLastPage) {
			getOrganizationUsers({ page: pagination + NEXT_PAGE_COUNT });
		}
	};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setListData({ list: [], isLastPage: false });
		getOrganizationUsers({ page: DEFAULT_PAGE_NUMBER });
	}, [getOrganizationUsers]);

	return {
		listData,
		loading,
		handleScroll,
		search,
		setSearch,
		setListData,
	};
};
export default useListLeadOrganizationUsers;
