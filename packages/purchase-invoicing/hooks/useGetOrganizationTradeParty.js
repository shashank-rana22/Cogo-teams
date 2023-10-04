import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetTradeParties = ({ serviceProvider = {} }) => {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_trade_parties',
	}, { manual: true });

	const getSelfTradeParty = useCallback(async () => {
		try {
			await trigger({
				params: {
					documents_data_required         : true,
					other_addresses_data_required   : true,
					poc_data_required               : true,
					billing_addresses_data_required : true,
					page_limit                      : 50,
					filters                         : {
						organization_id  : serviceProvider.service_provider_id,
						trade_party_type : 'self',
						status           : 'active',
					},
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, serviceProvider]);

	useEffect(() => {
		getSelfTradeParty();
	}, [getSelfTradeParty]);

	return {
		loading,
		data,
		getSelfTradeParty,
	};
};

export default useGetTradeParties;
