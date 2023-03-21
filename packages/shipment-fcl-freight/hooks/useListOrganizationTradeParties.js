import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListOrganizationTradeParties = ({ defaultFilters = {}, organization_id = '', defaultParams = {} }) => {
	const [apiData, setApiData] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({});

	const [{ loading:apiLoading }, trigger] = useRequest('list_organization_trade_parties', { manual: true });
	const { page = 1, ...restFilters } = filters;

	const apiTrigger = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters: {
						organization_id,
						...defaultFilters,
						...restFilters,
					},
					page,
					page_limit: 10,
					...defaultParams,
				},
			});

			setApiData(res.data || {});
			setLoading(false);
		} catch (err) {
			setApiData({});
			setLoading(false);
			console.log(err);
		}
	};

	useEffect(() => {
		apiTrigger();
	}, [filters]);

	return {
		data    : apiData,
		loading : apiLoading || loading,
		apiTrigger,
		filters,
		setFilters,
	};
};

export default useListOrganizationTradeParties;
