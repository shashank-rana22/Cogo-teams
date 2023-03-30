import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback, useMemo } from 'react';

const useListFaqSearchHistory = () => {
	const [searchHistory, setSearchHistory] = useState('');

	const profile = useSelector((state) => state.profile || {});

	const { id = '' } = profile?.user || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	const params = useMemo(() => ({
		filters: {
			user_id    : id,
			is_cleared : false,
			q          : query || undefined,
		},
	}), [id, query]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_faq_search_histories',
		params,
	}, { manual: true });

	const fetchFaqSearchHistory = useCallback(() => {
		try {
			trigger(params);
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [params, trigger]);

	useEffect(() => {
		debounceQuery(searchHistory);
	}, [debounceQuery, searchHistory]);

	const { list = [] } = data || {};

	return {
		data,
		searchHistory,
		setSearchHistory,
		list,
		loading,
		trigger,
		fetchFaqSearchHistory,
	};
};

export default useListFaqSearchHistory;
