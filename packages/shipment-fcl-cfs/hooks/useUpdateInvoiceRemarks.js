import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateInvoiceRemarks = ({
	refetch = () => {},
	successMessage = 'Your remarks have been added successfully',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_cfs/update_invoice_remarks',
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
