import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
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
			Toast.error(getApiError(error?.response?.data));
		}
	};
	return { onSubmitRemarks, loading };
};

export default useUpdateInvoiceRemarks;
