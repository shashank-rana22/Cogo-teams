import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useBlockUserBudgetAllocation = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_agent_budget_allocation_status',
			method : 'POST',
		},
		{ manual: true },
	);

	const blockUserBudget = async (value) => {
		const { agent_id = '', status = '' } = value || {};

		try {
			await trigger({
				data: {
					agent_id,
					status: status === 'active' ? 'blocked' : 'active',
				},
			});

			Toast.success(`Agent ${(status === 'active') ? 'Blocked' : 'UnBlocked'}!`);

			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		blockUserBudget,
	};
};

export default useBlockUserBudgetAllocation;
