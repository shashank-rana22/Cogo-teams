import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetSaasContainerSubscription = ({
	shipmentId = '',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_saas_container_subscription',
		method : 'GET',
	}, { manual: true });

	const getSaasContainerSubscription = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id: shipmentId,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error));
			}
		})();
	}, [shipmentId, trigger]);

	useEffect(() => {
		getSaasContainerSubscription();
	}, [getSaasContainerSubscription]);

	return {
		loading,
		data,
	};
};

export default useGetSaasContainerSubscription;
