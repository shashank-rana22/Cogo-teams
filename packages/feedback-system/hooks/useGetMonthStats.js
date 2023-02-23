import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useGetMonthStats = () => {
	const { profile:{ user:{ id:manager_id = '' } } } = useSelector((state) => state);

	const [params, setParams] = useState({
		ManagerID : manager_id,
		Page      : 1,
		PageLimit : 20,
	});

	const [{ data = {}, loading = false }] = useRequest({
		url    : 'get_month_stats',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => {
		setParams({ ...params, Page: p });
	};

	return { params, setParams, data, loading, setPage };
};

export default useGetMonthStats;
