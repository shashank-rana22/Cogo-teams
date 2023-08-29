import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGINATION = 1;
const MIN_HEIGHT = 0;

const getPayload = ({ pagination = 1, appliedFilters = {}, searchQuery = '' }) => ({
	params: {
		page    : pagination,
		source  : 'omnichannel',
		filters : {
			agent_id : appliedFilters?.agent || undefined,
			q        : searchQuery || undefined,
		},
	},
});

const useGetVoiceCallList = ({ searchValue = '' }) => {
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
	const [appliedFilters, setAppliedFilters] = useState({});

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = useCallback(async () => {
		try {
			const res = await trigger(getPayload({
				pagination,
				appliedFilters,
				searchQuery,
			}));

			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((prev) => ({ list: [...(prev.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			console.error(error);
		}
	}, [appliedFilters, pagination, searchQuery, trigger]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= MIN_HEIGHT;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + DEFAULT_PAGINATION);
		}
	};

	useEffect(() => {
		setListData((previous) => ({ ...previous, list: [] }));
		setPagination(DEFAULT_PAGINATION);
	}, [appliedFilters, searchQuery]);

	useEffect(() => {
		voiceCallList();
	}, [voiceCallList]);

	return {
		loading,
		data: listData,
		handleScroll,
		setAppliedFilters,
		appliedFilters,
	};
};
export default useGetVoiceCallList;
