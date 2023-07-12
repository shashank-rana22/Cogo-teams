import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentService = ({
	refetch = () => {},
	successMessage = 'Successfully Updated',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_service',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			const res =	await trigger({ data: payload });

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
