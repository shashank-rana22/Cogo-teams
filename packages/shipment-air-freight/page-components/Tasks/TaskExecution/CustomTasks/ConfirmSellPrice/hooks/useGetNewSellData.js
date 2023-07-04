import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useGetNewSellData = (shipmentData) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_new_sell_data',
		method : 'GET',
	}, { manual: true });

	const getNewSellData = async () => {
		try {
			await trigger({ params: { shipment_id: shipmentData?.id } });
		} catch (error) {
			toastApiError(error);
		}
	};

	return { data, getNewSellData, loading };
};

export default useGetNewSellData;
