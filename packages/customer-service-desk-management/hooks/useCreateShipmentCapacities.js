import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getPayload from '../utils/getPayload';

const useCreateShipmentCapacities = ({ setActiveItem = () => {} }) => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'csd_config_shipment_capacities',
		method  : 'POST',
		authkey : 'post_allocation_csd_config_shipment_capacities',
	}, { manual: true });

	const createShipmentCapacities = async ({ values = {}, agentExperienceSlabs = [], configId = '' }) => {
		try {
			await trigger({
				data: getPayload({ values, agentExperienceSlabs, configId }),
			});
			setActiveItem('total_shipment_capacity');
			Toast.success('Shipment Capacities have been set successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createShipmentCapacities,
		loading,
	};
};

export default useCreateShipmentCapacities;
