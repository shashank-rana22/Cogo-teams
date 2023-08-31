import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateRevenueDeskWallet = ({ service_type, wallet_amount }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_revenue_desk_wallet',
		method : 'post',
	}, { manual: true });

	const updateRevenueDeskWallet = async () => {
		try {
			await trigger({ params: { service_type, wallet_amount } });
		} catch (err) {
			toastApiError(err);
		}
	};

	return { updateRevenueDeskWallet, loading };
};

export default useUpdateRevenueDeskWallet;
