import {useEffect} from 'react';
import { useRequest } from '@cogoport/request';
import toastApiError from '../utils/toastApiError';

const useGetSaasContainerSubscription = ({
	serialId,
	truckNumber,
}) => {
	const payload = { serial_id: serialId, truck_number: truckNumber };

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_saas_ftl_tracking_detail',
		method : 'GET',
	}, { manual: true });

	const listShipments = async () => {
		try {
			await trigger({
				params: {
					...payload,
				},
			});
		} catch (error) {
			toastApiError(error)
		}
	};
	let apiData;

	const trackerData = data ?? {};
		const trackingContainersData = [
			{
				tracking_data: trackerData?.data,
			},
		];
		apiData = {
			...trackerData,
			data: trackingContainersData,
		};

	useEffect(() => {
		listShipments();
	}, []);

	return {
		loading,
		data: apiData,
		listShipments,
	};
};

export default useGetSaasContainerSubscription;