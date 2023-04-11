import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useListTradeDocuments = ({ defaultFilters = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_trade_documents',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
			},
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

export default useListTradeDocuments;
