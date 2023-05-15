import { useRequest } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';


const useUpdateCurrency = ({refetch, payload, currency}) => {
    const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_invoice_currency',
		method : 'POST',
	}, { manual: true });

	const onCreate = async () => {
        if (payload.invoice_currency === currency) {
			Toast.error(`Currency is already in ${currency}`);
			return;
		}
		if (isEmpty(payload.invoice_currency)) {
			Toast.error("Currency is required");
			return;
		}
		try {
			const res = await trigger({
				data: payload
			});
			if (!res.hasError) {
				Toast.success('Invoice Currency Updated');
				refetch();
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