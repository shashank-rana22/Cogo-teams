import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetSaasContainerSubscription = ({
	shipmentId = '',
	endPoint = '',
}) => {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));

	const [{ loading, data }, trigger] = useRequest({
		url    : `get_saas_${endPoint}_subscription`,
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

	let apiData;
	if (endPoint === 'container') {
		apiData = data;
	} else {
		const trackerData = data ?? {};
		const trackingContainersData = [
			{
				airway_bill_no : trackerData?.airway_bill_no,
				tracking_data  : trackerData?.data,
			},
		];
		apiData = {
			...trackerData,
			data: trackingContainersData,
		};
	}

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		loading,
		data: apiData,
	};
};

export default useGetSaasContainerSubscription;
