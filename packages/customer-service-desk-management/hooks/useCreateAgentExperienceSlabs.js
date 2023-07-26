import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getExperienceSlabs from '../utils/getExperienceSlabs';

const apiMapping = ({ isEditMode = false }) => {
	if (isEditMode) {
		return {
			url     : 'update_csd_config',
			authkey : 'post_allocation_update_csd_config',
		};
	}
	return {
		url     : 'csd_config_agent_experience_slabs',
		authkey : 'post_allocation_csd_config_agent_experience_slabs',
	};
};

const useCreateAgentExperienceSlabs = ({ isEditMode = false }) => {
	const { url = '', authkey = '' } = apiMapping({ isEditMode });

	const [{ loading }, trigger] = useAllocationRequest({
		url,
		method: 'POST',
		authkey,
	}, { manual: true });

	const createAgentExperienceSlabs = async ({ values = {}, configId, setShowForm = () => {} }) => {
		try {
			await trigger({
				data: {
					...(isEditMode ? { id: configId } : { config_id: configId }),
					agent_experience_slabs: getExperienceSlabs(values.agent_experience_slabs),
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
