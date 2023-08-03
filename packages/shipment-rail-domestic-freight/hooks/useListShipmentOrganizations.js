import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback, useState } from 'react';

const useListShipmentOrganizations = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [filters, setFilters] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_organizations',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
				...filters,
			},
			...defaultParams,
		},
	}, { manual: true });

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

export default useListShipmentOrganizations;
