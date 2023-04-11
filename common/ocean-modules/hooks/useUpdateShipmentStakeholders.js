import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateShipmentStakeholders = ({
	shipment_id,
	successMessage = 'Successfully Updated',
	refetch = () => { },
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_stakeholders',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ params: { id: shipment_id, ...val } });

			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateShipmentStakeholders;
