import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useGetMonthStats = () => {
	const { profile:{ user:{ id:manager_id = '' } } } = useSelector((state) => state);

	const [params, setParams] = useState({
		filters    : {},
		ManagerID  : manager_id,
		page       : 1,
		page_limit : 20,
	});

	const [{ data = {}, loading = false }] = useRequest({
		url    : 'get-month-stats',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => {
		setParams({ ...params, page: p });
	};

	return { params, setParams, data, loading, setPage };
};

export default useGetMonthStats;
