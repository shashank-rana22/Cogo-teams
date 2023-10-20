import { useHarbourRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useGetListPayrollDetail = ({ activeTab }) => {
	const [filters, setFilters] = useState({
		page_limit     : 100,
		page           : 1,
		financial_year : null,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_payroll_detail',
	}, { manual: true });

	const getListPayrollDetail = useCallback(
		async () => {
			const { page_limit, page, financial_year, ...rest } = filters;
			await	trigger({
				params: {
					filters: {
						...rest,
						status: activeTab,
						financial_year,
					},
					page_limit,
					page,
				},
			});
		},
		[filters, trigger, activeTab],
	);

	useEffect(() => {
		getListPayrollDetail();
	}, [getListPayrollDetail]);

	return { loading, data, filters, setFilters, refetch: getListPayrollDetail };
};

export default useGetListPayrollDetail;
