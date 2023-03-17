import { useIrisRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetMonthStats = () => {
	const [params, setParams] = useState({
		Page      : 1,
		PageLimit : 20,
	});

	const [{ data = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_get_month_stats',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => {
		setParams({ ...params, Page: p });
	};

	return { params, setParams, data, loading, setPage };
};

export default useGetMonthStats;
