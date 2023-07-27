import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getPayload from '../utils/getPayload';

const apiMapping = ({ mode = '', stage }) => {
	if (mode === 'edit' || !isEmpty(stage)) {
		return {
			url     : 'update_csd_config',
			authkey : 'post_allocation_update_csd_config',
		};
	}
	return {
		url     : 'csd_config_shipment_capacities',
		authkey : 'post_allocation_csd_config_shipment_capacities',
	};
};

const useCreateShipmentCapacities = ({ setActiveItem = () => {} }) => {
	const router = useRouter();

	const { mode = '', stage } = router.query;

	const { url = '', authkey = '' } = apiMapping({ mode, stage });

	const isEditMode = mode === 'edit';

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createShipmentCapacities = async ({ values = {}, agentExperienceSlabs = [], configId = '' }) => {
		try {
			await trigger({
				data: getPayload({ values, agentExperienceSlabs, configId, isEditMode, stage }),
			});

			let href = `/customer-service-desk-management/create-config?id=${configId}&stage=shipmentCapacity`;

			if (isEditMode) {
				href += '&mode=edit';
			}

			await router.push(href);

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
