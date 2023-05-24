import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useListDocuments({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	shipment_type = '',
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : `${shipment_type}/list_documents`,
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
	}, [listDocuments, filters]);

	return {
		loading,
		refetch : listDocuments,
		list    : data,
	};
}

export default useListDocuments;
