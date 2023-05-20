import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetPlanList = () => {
	const [globalFilters, setGlobalFilters] = useState({
		page: 1,
	});

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_saas_plans',
	}, { manual: true });

	const refetchPlanList = async () => {
		const { page = 1 } = globalFilters;
		try {
			await trigger({
				params: {
					filters: { plan_type: 'P' },
					page,
				},
			});
		} catch (err) {
			console.log(err, 'ererer');
		}
	};

	const pageChangeHandler = (v) => {
		setGlobalFilters((prev) => ({ ...prev, page: v }));
	};

	useEffect(() => {
		refetchPlanList();
	}, [globalFilters]);

	return {
		planList: data, loading, setGlobalFilters, pageChangeHandler,
	};
};
export default useGetPlanList;
