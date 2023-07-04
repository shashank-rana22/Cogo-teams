import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
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

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		data,
		loading,
		apiTrigger,
	};
};

export default useListTradeDocuments;
