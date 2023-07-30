import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import getExperienceSlabs from '../utils/getExperienceSlabs';

const apiMapping = ({ id, agentExpSlabs = [] }) => {
	if (id || !isEmpty(agentExpSlabs)) {
		return {
			url     : 'update_ccs_shipment_capacity_details',
			authkey : 'post_allocation_update_ccs_shipment_capacity_details',
		};
	}
	return {
		url     : 'ccs_shipment_capacity_details',
		authkey : 'post_allocation_ccs_shipment_capacity_details',
	};
};

const useCreateAgentExperienceSlabs = ({ fetchList = () => {}, agentExpSlabs = [] }) => {
	const router = useRouter();

	const { id } = router.query;

	const { url = '', authkey = '' } = apiMapping({ id, agentExpSlabs });

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createAgentExperienceSlabs = async ({ values = {}, setShowForm = () => {}, clearErrors = () => {} }) => {
		try {
			const res = await trigger({
				data: {
					config_id                     : id,
					role_id                       : values.role_id,
					cogo_entity_id                : values.cogo_entity_id,
					agent_experience_slab_details : getExperienceSlabs(values.agent_experience_slabs),
				},
			});

			if (!id) {
				await router.push(`/centralised-customer-service/
									create-shipment-capacity-config?id=${res.data.id}`);
			}

			clearErrors();

			fetchList();

			setShowForm(true);
			Toast.success('Experience set successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createAgentExperienceSlabs,
		loading,
	};
};

export default useCreateAgentExperienceSlabs;
