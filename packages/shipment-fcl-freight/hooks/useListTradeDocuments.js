import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const DEFAULT_PAGE_LIMIT = 100;
const useListTradeDocuments = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_trade_documents',
		method : 'GET',
		params : {
			page_limit : DEFAULT_PAGE_LIMIT,
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
