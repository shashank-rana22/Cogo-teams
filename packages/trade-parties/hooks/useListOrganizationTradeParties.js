import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationTradeParties = ({
	defaultParams = {},
	defaultFilters = {},
}) => {
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_organization_trade_parties',
			params : {
				filters: {
					...(defaultFilters || {}),
				},
				...(defaultParams || {}),
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (err) {
			setData({});
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
export default useListOrganizationTradeParties;
