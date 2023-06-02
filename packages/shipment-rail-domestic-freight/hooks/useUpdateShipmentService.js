import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateShipmentService = ({
	refetch = () => {},
	successMessage = 'Successfully Updated',
}) => {
	const [{ loading }, trigger] = useRequest({
		url          : '/update_shipment_service',
		method       : 'POST',
		service_name : 'shipment',
	});

	const apiTrigger = async (payload) => {
		try {
			const res = await trigger({ data: payload });

			Toast.success(successMessage);
			refetch();
			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		apiTrigger, loading,
	};
};

export default useUpdateShipmentService;
