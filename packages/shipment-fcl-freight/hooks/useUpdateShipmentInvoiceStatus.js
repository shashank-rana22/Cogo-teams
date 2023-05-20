import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentInvoiceStatus = ({
	invoice = {},
	refetch = () => {},
	status = '',
	changeApplicableState = false,
	successMessage = 'Status updated successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_invoice_status',
		method : 'POST',
	});

	const updateInvoiceStatus = async () => {
		try {
			const res = await trigger({
				data: {
					id                : invoice?.id,
					status,
					liners_ex_applied : changeApplicableState ? false : undefined,
				},
			});

			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateInvoiceStatus,
		loading,
	};
};

export default useUpdateShipmentInvoiceStatus;
