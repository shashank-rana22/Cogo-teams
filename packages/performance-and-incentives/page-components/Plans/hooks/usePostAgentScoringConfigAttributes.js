import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const usePostAgentScoringAttributes = () => {
	const { query = {} } = useRouter();

	const { id } = query;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'config_attributes',
		method  : 'POST',
		authkey : 'post_agent_scoring_config_attributes',
	}, { manual: true });

	const postAgentScoringAttributes = async ({ agentScoringBlockId = '', agentScoringParameters = [] }) => {
		try {
			await trigger({
				data: {
					id,
					agent_scoring_blocks: [{
						agent_scoring_block_id          : agentScoringBlockId,
						status                          : 'active',
						agent_scoring_parameter_details : agentScoringParameters,
					}],
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
