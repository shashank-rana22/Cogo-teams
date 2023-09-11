import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useCreateScoringConfig = () => {
	// const { id } = router.query;

	// const { url = '', authkey = '' } = apiMapping({ id, agentExpSlabs });

	const [{ loading }, trigger] = useAllocationRequest({
		url     : 'config',
		method  : 'POST',
		authkey : 'post_agent_scoring_config',
	}, { manual: true });

	const createScoringConfig = async ({ values = {} }) => {
		try {
			const res = await trigger({
				data: {
					cogo_entity_id : values.cogo_entity_id,
					role_function  : values.role_function,
					channel        : values.channel,
					role_ids       : values.role_ids,
					display_name   : values.display_name,
				},
			});

			console.log(res.data.id, 'hello');

			Toast.success('Saved successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createScoringConfig,
		loading,
	};
};

export default useCreateScoringConfig;
