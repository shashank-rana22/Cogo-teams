import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

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
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateShipmentStakeholders;
