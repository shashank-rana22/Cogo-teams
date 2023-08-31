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
			const res =	await trigger({ data });
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
