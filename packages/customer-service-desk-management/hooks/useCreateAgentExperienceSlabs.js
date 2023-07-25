import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';

const OFFSET = -1;
const MAX_SLAB_INDEX = 3;

const useCreateAgentExperienceSlabs = () => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'csd_config_agent_experience_slabs',
		method  : 'POST',
		authkey : 'post_allocation_csd_config_agent_experience_slabs',
	}, { manual: true });

	const createAgentExperienceSlabs = async ({ values = {}, configId, setShowForm = () => {} }) => {
		try {
			await trigger({
				data: {
					config_id              : configId,
					agent_experience_slabs : values.agent_experience_slabs.map((slab, index) => {
						const { slab_unit, slab_lower_limit, slab_upper_limit } = slab;

						if (index === MAX_SLAB_INDEX) {
							return {
								slab_unit,
								slab_lower_limit: Number(slab.slab_lower_limit
									.slice(GLOBAL_CONSTANTS.zeroth_index, OFFSET)),
								slab_upper_limit: 99999,
							};
						}
						return {
							slab_unit,
							slab_lower_limit : Number(slab_lower_limit),
							slab_upper_limit : Number(slab_upper_limit),
						};
					}),
				},
			});
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
