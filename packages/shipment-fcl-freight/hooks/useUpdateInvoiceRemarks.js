import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useUpdateInvoiceRemarks = ({
	refetch = () => {},
	successMessage = 'Your remarks have been added successfully',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/update_invoice_remarks',
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
			Toast.error(getApiError(error?.response?.data));
		}
	};
	return { onSubmitRemarks, loading };
};

export default useUpdateInvoiceRemarks;
