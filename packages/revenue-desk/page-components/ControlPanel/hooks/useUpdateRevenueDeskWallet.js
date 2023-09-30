import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateRevenueDeskWallet = ({ service_type, wallet_amount, refetch = () => {}, data }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_revenue_desk_wallet',
		method : 'post',
	}, { manual: true });

	const updateRevenueDeskWallet = async ({ status }) => {
		const { shipment_parameters } = data;
		const { trade_type, origin_location_id, destination_location_id } = shipment_parameters;
		try {
			await trigger({
				params: {
					service_type,
					wallet_amount,
					status,
					shipment_parameters: { trade_type, origin_location_id, destination_location_id },
				},
			});
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return { updateRevenueDeskWallet, loading };
};

export default useUpdateRevenueDeskWallet;
