import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useListDocuments({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_documents',
		method : 'GET',
		params : {
			filters: {
				...filters,
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const listDocuments = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments]);

	return {
		loading,
		refetch : listDocuments,
		list    : data || [],
	};
}

export default useListDocuments;
