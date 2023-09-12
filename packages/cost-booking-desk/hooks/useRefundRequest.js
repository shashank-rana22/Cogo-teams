import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';

const useRefundRequest = ({ setUpdateRefundModal = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/payments/accounts',
		method  : 'POST',
		authKey : 'post_payments_accounts',
	}, { manual: true });

	const apiTrigger = async ({ payload = {} }) => {
		try {
			await trigger({ data: payload });
			Toast.success('Success');
			setUpdateRefundModal({});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useRefundRequest;
