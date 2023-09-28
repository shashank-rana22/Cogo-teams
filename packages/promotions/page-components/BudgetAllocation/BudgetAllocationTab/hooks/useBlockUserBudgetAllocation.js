import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useBlockUserBudgetAllocation = (blockAndRefetch = () => {}) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_agent_budget_allocation_status',
			method : 'POST',
		},
		{ manual: true },
	);

	const blockUserBudget = async (value) => {
		const { agent_id = '', status = '' } = value;

		try {
			const payload = {
				agent_id,
				status: status === 'active' ? 'blocked' : 'active',
			};
			await trigger({
				data: payload,
			});
			if (status === 'active') {
				Toast.success('Agent Blocked!');
			} else {
				Toast.success('Agent UnBlocked!');
			}
			blockAndRefetch();
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return {
		loading,
		blockUserBudget,
	};
};

export default useBlockUserBudgetAllocation;
