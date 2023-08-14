import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

const apiMapping = ({ data = {} }) => {
	if (isEmpty(data.shipment_capacities)) {
		return {
			url     : 'ccs_config_shipment_capacity_slab',
			authkey : 'post_allocation_ccs_config_shipment_capacity_slab',
		};
	}
	return {
		url     : 'update_ccs_config_shipment_capacity_slab',
		authkey : 'post_allocation_update_ccs_config_shipment_capacity_slab',
	};
};

const useCreateShipmentCapacities = ({ data = {}, setActiveItem = () => {}, source = '' }) => {
	const router = useRouter();

	const { id } = router.query;

	const { url = '', authkey = '' } = apiMapping({ data });

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createShipmentCapacities = async ({ values = {}, agentExperienceSlabs = [] }) => {
		try {
			await trigger({
				data: getPayload({ values, agentExperienceSlabs, id, source }),
			});

			const href = `/centralised-customer-service/create-shipment-capacity-config
						?id=${id}`;

			await router.push(source ? '/centralised-customer-service?activeTab=shipment_capacity_config' : href);

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
