import { useAuthRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListResources = ({ searchState = '', status = true }) => {
	const [params, setParams] = useState({ page: 1, page_limit: 20, filters: {} });
	const [refetch, setRefetch] = useState(false);

	const [{ data = {}, loading = false }, trigger] = useAuthRequest({
		url    : 'list_resources',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => {
		setParams((pv) => ({ ...pv, page: p }));
	};

	useEffect(() => {
		let currentStatus;
		if (status === 'active') {
			currentStatus = true;
		} else if (status === 'inactive') {
			currentStatus = false;
		} else {
			currentStatus = undefined;
		}

		setParams((pv) => ({
			...pv,
			filters: {
				...(pv.filters),
				q      : searchState || undefined,
				status : currentStatus,
			},
		}));
	}, [searchState, status]);

	useEffect(() => {
		if (refetch) {
			trigger({ params });
		}
		setRefetch(false);
	}, [refetch, setRefetch, trigger, params]);

	return { data, loading, setPage, params, setRefetch };
};

export default useListResources;
