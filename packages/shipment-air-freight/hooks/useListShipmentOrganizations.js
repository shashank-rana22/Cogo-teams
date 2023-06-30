import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentOrganizations = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/list_shipment_organizations',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
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
	}, [apiTrigger]);

	return {
		data,
	};
};

export default useListShipmentOrganizations;
