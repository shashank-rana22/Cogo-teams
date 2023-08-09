import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const API = {
	fcl_freight          : 'list_fcl_freight_rate_requests',
	ftl_freight          : 'list_ftl_freight_rate_requests',
	air_freight          : 'list_air_freight_rate_requests',
	ltl_freight          : 'list_ltl_freight_rate_requests',
	lcl_freight          : 'list_lcl_freight_rate_requests',
	fcl_customs          : 'list_fcl_customs_rate_requests',
	lcl_customs          : 'list_lcl_customs_rate_requests',
	air_customs          : 'list_air_customs_rate_requests',
	haulage_freight      : 'list_haulage_freight_rate_requests',
	domestic_air_freight : 'list_domestic_air_freight_rate_requests',
	trailer_freight      : 'list_trailer_freight_rate_requests',
	fcl_freight_local    : 'list_fcl_freight_rate_local_requests',
	fcl_cfs              : 'list_fcl_cfs_rate_requests',
};

const useListFreightRateRequest = ({ filter, currentPage }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : API[filter.service],
		method : 'GET',
	}, { manual: false });

	const listFreightRateRequest = useCallback(async () => {
		const finalFilter = Object.fromEntries(
			Object.entries(filter).filter(([, value]) => value !== ''),
		);
		try {
			await trigger({
				params: {
					filters: {
						// relevant_supply_agent:undefined,
						status: 'active',
						...finalFilter,
					},
					page: currentPage,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [currentPage, filter, trigger]);

	useEffect(() => {
		listFreightRateRequest();
	}, [currentPage, listFreightRateRequest]);

	return {
		data,
		loading,
		listFreightRateRequest,
	};
};
export default useListFreightRateRequest;
