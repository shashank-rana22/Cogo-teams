import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

const useCreateShipmentAdditionalService = ({
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: { ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateShipmentAdditionalService;
