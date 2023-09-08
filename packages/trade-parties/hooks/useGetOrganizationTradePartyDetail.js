import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetOrganizationTradePartyDetail = ({ defaultParams = {} }) => {
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_organization_trade_party_detail',
			params : {
				...(defaultParams || {}),
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data?.data);
		} catch (err) {
			setData({});
			toastApiError(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);
	return { data, loading, apiTrigger };
};
export default useGetOrganizationTradePartyDetail;
