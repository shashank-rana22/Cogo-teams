import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListPossibelDocuments = ({ defaultParams = {} }) => {
	const [apiData, setApiData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/get_possible_documents',
		method : 'GET',
		params : {
			...defaultParams,
		},

	}, { manual: true });

	const getList = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getList();
	}, [getList]);

	return {
		// getList,
		loading,
		data: apiData,
	};
};
export default useListPossibelDocuments;
