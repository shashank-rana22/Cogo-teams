import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateCurrency = ({ refetch, currency }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_invoice_currency',
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
