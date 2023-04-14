import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateShipmentService = ({
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_service',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger, loading,
	};
};

export default useUpdateShipmentService;
