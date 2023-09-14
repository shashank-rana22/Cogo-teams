import { useRequest } from '@/packages/request';

const UPDATE_API_URL = {
	ocean : '/create_saas_shipment_details',
	air   : '/create_saas_air_shipment_details',
};

const useCreateShipment = ({ closeHandler = () => {}, refetchTrackerList, activeTab = 'ocean' }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : UPDATE_API_URL[activeTab],
	}, { manual: true });

	const updateTrackerInfo = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			refetchTrackerList();
			closeHandler();
		} catch (err) {
			console.error(err);
		}
	};

	return {
		updateTrackerInfo,
		loading,
	};
};

export default useCreateShipment;
