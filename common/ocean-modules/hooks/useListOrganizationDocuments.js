import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListOrganizationDocuments = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_documents',
		method : 'GET',
		params : {
			page    : 1000,
			filters : {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getList = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			Toast.error(getApiErrorString(err));
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
