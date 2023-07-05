import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useCallback, useEffect } from 'react';

const useListTradeDocuments = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_trade_documents',
		method : 'GET',
		params : {
			page_limit : 100,
			filters    : {
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
		refetch: getList,
	};
};

export default useListTradeDocuments;
