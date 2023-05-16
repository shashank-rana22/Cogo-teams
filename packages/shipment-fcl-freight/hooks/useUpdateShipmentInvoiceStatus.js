import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentInvoiceStatus = ({
	invoice = {},
	setShowReview = () => {},
	refetch = () => {},
	status = '',
	changeApplicableState = false,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_invoice_status',
		method : 'POST',
	});

	let successMsz = 'Status updated successfully!';
	if (status === 'reviewed') {
		successMsz = 'Invoice sent for approval to customer!';
	} else if (status === 'approved') {
		successMsz = 'Invoice approved!';
	}

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
				Toast.success(successMsz);
				setShowReview(false);
				refetch();
			}
		} catch (err) {
			toastApiError(err?.data);
		}
	};

	return {
		updateInvoiceStatus,
		loading,
	};
};

export default useUpdateShipmentInvoiceStatus;
