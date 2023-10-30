import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetSalesFunnel = ({ companyType = '', entityCode = '', serviceType = '', salesFunnelMonth = '' }) => {
	const [
		{ data: salesFunnelData, loading: salesFunnelLoading },
		salesFunnelTrigger,
	] = useRequestBf(
		{
			url     : '/payments/dashboard/sales-funnel',
			method  : 'get',
			authKey : 'get_payments_dashboard_sales_funnel',
		},
		{ manual: true },
	);

	const salesFunnelApi = useCallback(async () => {
		await salesFunnelTrigger({
			params: {
				month       : salesFunnelMonth || undefined,
				entityCode  : entityCode || undefined,
				serviceType : serviceType || undefined,
				companyType : companyType !== 'All' ? (companyType || undefined) : undefined,
			},
		});
	}, [companyType, entityCode, serviceType, salesFunnelMonth, salesFunnelTrigger]);

	useEffect(() => {
		salesFunnelApi();
	}, [salesFunnelApi]);

	return {
		salesFunnelLoading,
		salesFunnelData: salesFunnelData || {},
	};
};

export default useGetSalesFunnel;
