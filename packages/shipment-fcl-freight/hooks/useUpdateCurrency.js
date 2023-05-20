import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

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
		if (isEmpty(payload.invoice_currency)) {
			Toast.error('Currency is required');
			return;
		}
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Invoice Currency Updated');
			refetch();
		} catch (err) {
			toastApiError(err?.data);
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useUpdateCurrency;
