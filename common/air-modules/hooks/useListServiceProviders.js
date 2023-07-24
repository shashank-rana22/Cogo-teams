import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListServiceProviders = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_service_providers',
		params : {
			filters: {
				shipment_id: id,
			},
			page_limit: 10,
		},
	}, { manual: true });

	const listStakeholders = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		listStakeholders();
	}, [listStakeholders]);

	return {
		loadingServiceProvider : loading,
		serviceProviderList    : data?.list,
	};
};

export default useListServiceProviders;
