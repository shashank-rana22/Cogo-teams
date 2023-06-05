import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useBulkUpdateShipmentServices = ({
	successMessage = 'Task Updated Successfully!',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_services',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

			Toast.success(successMessage);

			refetch();

			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useBulkUpdateShipmentServices;
