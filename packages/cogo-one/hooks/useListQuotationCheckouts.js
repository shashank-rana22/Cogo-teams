import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = () => ({
	get_sales_dashboard_stats: true,
});

function useListQuotationCheckouts() {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_checkouts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentQuotationCount = useCallback(() => {
		try {
			trigger({
				params: getParams(),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger]);

	useEffect(() => {
		getAgentQuotationCount();
	}, [getAgentQuotationCount]);

	return {
		quotationLoading : loading,
		quotationData    : data,
	};
}
export default useListQuotationCheckouts;
