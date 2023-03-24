import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useListFaqSearchHistory = () => {
	const [searchHistory, setSearchHistory] = useState('');

	const { profile = {} } = useSelector((state) => state);

	const { id = '' } = profile?.user || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	const params = {
		filters: {
			user_id    : id,
			is_cleared : false,
			q          : query || undefined,
		},
	};

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_faq_search_histories',
		params,
	}, { manual: false });

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
	};
};

export default useListFaqSearchHistory;
