import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

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
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments]);

	return {
		loading,
		refetch : listDocuments,
		list    : data,
	};
}

export default useListDocuments;
