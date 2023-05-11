import { useRequest } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';


const useUpdateCurrency = ({onClose, refetch, payload, currency}) => {
    const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_invoice_currency',
		method : 'POST',
	}, { manual: true });

	const onCreate = async () => {
        if (payload.invoice_currency === currency) {
			Toast.error(`Currency is already in ${currency}`);
			return;
		}
		try {
			const res = await trigger({
				data: payload
			});
			if (!res.hasError) {
				Toast.success('Invoice Currency Updated');
				refetch();
				if (onClose) {
					onClose();
				}
			}
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