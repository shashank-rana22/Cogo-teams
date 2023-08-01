import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateConsolidation = ({ allServices = [], callback = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	});

	const updateDetails = async (invoiceApprovalType) => {
		const formattedData = {
			service      : 'ftl_freight',
			service_data : allServices.map((service) => ({
				service_id : service?.id,
				data       : {
					invoice_approval_type: invoiceApprovalType,
				},
			})),
		};
		try {
			await trigger({
				data: formattedData,
			});
			callback();
			Toast.success('Service Updated Successfully');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		data,
		updateDetails,
	};
};

export default useUpdateConsolidation;
