import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationDocuments = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_documents',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getList = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getList();
	}, [getList]);

	return {
		data,
		loading,
		getList,
	};
};

export default useListOrganizationDocuments;
