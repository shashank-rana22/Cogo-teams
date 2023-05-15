import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdatePaymentMode = ({
	refetch = () => {},
	payload = {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_shipment_invoice_payment_mode',
		method : 'POST',
	}, { manual: true });

	const changePaymentMode = async () => {
		try {
			const res = await trigger({
				data: payload,
			});

			if (!res?.hasError) {
				Toast.success('Payment mode Updated');
				refetch();
			} else {
				Toast.error(res?.err);
			}
		} catch (err) {
			toastApiError(err?.data);
		}
	};

	return { changePaymentMode, loading, data };
};

export default useUpdatePaymentMode;
