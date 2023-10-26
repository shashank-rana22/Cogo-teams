import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError';

const useGetVendorTradeParties = ({ organization_id = '' }) => {
	const [{ data = {}, loading = false }, trigger] = useRequest(
		{
			url    : 'get_vendor_trade_parties_data',
			method : 'get',
		},
		{ manual: true },
	);

	const getVendorTradeParties = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id,
					organization_type: 'vendor',
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, organization_id]);

	useEffect(() => {
		getVendorTradeParties();
	}, [getVendorTradeParties]);

	return {
		vendorTradePartyDataLoading : loading,
		vendorTradePartyList        : data,
	};
};

export default useGetVendorTradeParties;
