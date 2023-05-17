import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateInvoiceRemarks = ({
	refetch = () => {},
	payload = {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/update_invoice_remarks',
		method : 'POST',
	}, { manual: true });

	const onSubmitRemarks = async () => {
		try {
			const res = await trigger({
				data: payload,
			});
			if (!res.hasError) {
				Toast.success('Your remarks have been added successfully');
				refetch();
			}
		} catch (error) {
			toastApiError(error?.data);
		}
	};
	return { onSubmitRemarks, loading };
};

export default useUpdateInvoiceRemarks;
