import { useRequest } from '@cogoport/request';
import { useState } from 'react';

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
};

export default useListSaasRailDomesticFreightContainerDetails;
