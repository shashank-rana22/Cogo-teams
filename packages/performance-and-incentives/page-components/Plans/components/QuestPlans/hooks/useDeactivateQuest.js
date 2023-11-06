import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const useDeactivateQuest = ({ afterDeactivate = () => {} }) => {
	const [{ loading }, trigger] = useAllocationRequest(
		{
			url     : '/quest_attributes',
			method  : 'POST',
			authkey : 'post_agent_scoring_quest_attributes',
		},
		{ manual: true },
	);

	const handleClick = async ({ id }) => {
		try {
			await trigger({
				data: {
					agent_scoring_quest_id : id,
					status                 : 'inactive',
				},
			});

			Toast.success('Saved successfully!');
			afterDeactivate();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		handleClick,
	};
};

export default useDeactivateQuest;
