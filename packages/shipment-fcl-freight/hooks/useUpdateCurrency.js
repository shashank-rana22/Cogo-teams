import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCurrency = ({ refetch, currency }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/update_invoice_currency',
		method : 'POST',
	}, { manual: true });

	const onCreate = async (payload) => {
		if (payload.invoice_currency === currency) {
			Toast.error(`Currency is already in ${currency}`);
			return;
		}
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Invoice Currency Updated');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useUpdateCurrency;
