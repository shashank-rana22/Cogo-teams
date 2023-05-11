import { useRequest } from '@cogoport/request';
import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

const useReviewInvoice = ({ 
	refetch = () => {},
	onClose = () => {},
	payload = {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/add_shipment_invoice_combination_remarks',
		method : 'POST',
	}, { manual: true });

	const onSubmitRemarks = async () => {
		try {
			const res = await trigger({
				data: payload,
			});
			if (!res.hasError) {
				Toast.success('Your remarks have been added successfully');
				onClose();
				refetch();
			}
		} catch (error) {
			toastApiError(error?.data);
		}
	};

	return { onSubmitRemarks,loading, };
};

export default useReviewInvoice;