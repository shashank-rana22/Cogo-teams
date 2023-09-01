import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateRevenueDeskWallet = ({ service_type, wallet_amount }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_revenue_desk_wallet',
		method : 'post',
	}, { manual: true });

	const updateRevenueDeskWallet = async ({ status }) => {
		try {
			await trigger({ params: { service_type, wallet_amount, status } });
		} catch (err) {
			toastApiError(err);
		}
	};

	return { updateRevenueDeskWallet, loading };
};

export default useUpdateRevenueDeskWallet;
