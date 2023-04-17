import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListDocuments({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_documents',
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
		list    : data?.list || [],
	};
}

export default useListDocuments;
