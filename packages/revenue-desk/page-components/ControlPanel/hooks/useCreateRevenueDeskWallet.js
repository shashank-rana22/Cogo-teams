import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateRevenueDeskWallet = ({ setCreateWallet = () => {}, refetch = () => {} }) => {
	const SUCCESS_MESSAGE = 'Successfully created';

	const [{ loading }, trigger] = useRequest({
		url    : '/create_revenue_desk_wallet',
		method : 'POST',
	}, { manual: true });

	const createRevenueDeskWallet = async (data) => {
		const { trade_type, origin_location_id, destination_location_id, ...rest } = data || undefined;
		try {
			const res =	await trigger({
				data: {
					shipment_parameters: {
						trade_type              : trade_type || undefined,
						origin_location_id      : origin_location_id || undefined,
						destination_location_id : destination_location_id || undefined,
					},
					...rest,
				} || undefined,
			});
			if (!res.hasError) {
				Toast.success(SUCCESS_MESSAGE);
				setCreateWallet(false);
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return { createRevenueDeskWallet, loading };
};

export default useCreateRevenueDeskWallet;
