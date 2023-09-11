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

	const postAgentScoringAttributes = async () => {
		try {
			await trigger({
				data: {
					id,
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
