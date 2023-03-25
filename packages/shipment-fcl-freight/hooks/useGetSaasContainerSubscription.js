import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetSaasContainerSubscription = ({
	shipmentId = '',
}) => {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_saas_container_subscription',
		method : 'GET',
		scope,
	}, { manual: true });

	const listShipments = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id: shipmentId,
					},
				});
			} catch (error) {
				console.log(getApiErrorString(error));
			}
		})();
	}, [shipmentId, trigger]);

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		loading,
		data,
	};
};

export default useGetSaasContainerSubscription;
// TODO