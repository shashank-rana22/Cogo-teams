import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';

const useListPaymentAccounts = ({ setUpdateRefundModal = () => {}, exchangeRateApiTrigger = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/payments/accounts',
		method  : 'POST',
		authKey : 'post_payments_accounts',
	}, { manual: true });

	const apiTrigger = async ({ payload = {} }) => {
		try {
			await exchangeRateApiTrigger();
			await trigger({ data: { ...payload } });
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

export default useListPaymentAccounts;
