import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateRevenueDeskWallet = ({ setCreateWallet }) => {
	const SUCCESS_MESSAGE = 'Successfully created';

	const [{ loading }, trigger] = useRequest({
		url    : '/create_revenue_desk_wallet',
		method : 'POST',
	}, { manual: true });

	const createRevenueDeskWallet = async (data) => {
		try {
			const { trade_type = '', origin_location_id = '', destination_location_id = '', ...rest } = data;
			const res =	await trigger({
				data: {
					shipment_parameter: { trade_type, origin_location_id, destination_location_id },
					...rest,
				},
			});
			if (!res.hasError) {
				Toast.success(SUCCESS_MESSAGE);
				setCreateWallet(false);
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return { createRevenueDeskWallet, loading };
};

export default useCreateRevenueDeskWallet;
