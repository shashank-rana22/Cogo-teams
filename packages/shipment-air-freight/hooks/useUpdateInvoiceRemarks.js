import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateInvoiceRemarks = ({
	refetch = () => {},
	successMessage = 'Your remarks have been added successfully',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'add_shipment_invoice_combination_remarks',
		method : 'POST',
	}, { manual: true });

	const onSubmitRemarks = async (payload) => {
		try {
			await trigger({
				data: payload,
			});

			Toast.success(successMessage);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};
	return { onSubmitRemarks, loading };
};

export default useUpdateInvoiceRemarks;
