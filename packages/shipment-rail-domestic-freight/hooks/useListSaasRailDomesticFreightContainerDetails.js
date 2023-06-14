import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useState, useEffect, useCallback } from 'react';

const useListSaasRailDomesticFreightContainerDetails = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [filters, setFilters] = useState({});
	const { page, ...restFilters } = filters || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_saas_rail_domestic_freight_container_details',
		method : 'GET',
		params : {
			filters                  : { ...defaultFilters, ...restFilters },
			...defaultParams,
			page,
			pagination_data_required : true,

		},
	});

	const apiTrigger = useCallback(() => {
		(
			async () => {
				try {
					await trigger();
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		loading,
		data,
		apiTrigger,
		filters,
		setFilters,
	};
};

export default useListSaasRailDomesticFreightContainerDetails;
