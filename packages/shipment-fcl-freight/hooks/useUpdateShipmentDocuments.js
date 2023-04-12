import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

function useUpdateShipmentDocuments({
	params,
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	refetch = () => {},
}) {
	console.log('refetch', refetch);
	console.log('params', params);
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_documents',
		method : 'get',
		params : {
			filters: {
				...defaultFilters,
				...filters,
			},
			...defaultParams,
			...params,
		},
	}, { manual: true });

	const updateDocument = useCallback(() => {
		(async () => {
			try {
				const res = await trigger();
				if (!res?.hasError) {
					refetch();
				}
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, refetch]);

	useEffect(() => {
		updateDocument();
	}, [updateDocument]);

	return {
		taskUpdateLoading: loading,
		updateDocument,
	};
}

export default useUpdateShipmentDocuments;
