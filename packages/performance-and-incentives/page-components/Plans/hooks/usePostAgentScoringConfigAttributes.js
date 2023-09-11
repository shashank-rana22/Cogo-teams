import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const usePostAgentScoringAttributes = () => {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'config_attributes',
		method  : 'POST',
		authkey : 'post_agent_scoring_config_attributes',
	}, { manual: true });

	const postAgentScoringAttributes = async ({ values = {} }) => {
		try {
			await trigger({
				data: {
					cogo_entity_id : values.cogo_entity_id,
					role_function  : values.role_function,
					channel        : values.channel,
					role_ids       : values.role_ids,
					display_name   : values.display_name,
				},
			});

			Toast.success('Saved successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		postAgentScoringAttributes,
		loading,
	};
};

export default usePostAgentScoringAttributes;
