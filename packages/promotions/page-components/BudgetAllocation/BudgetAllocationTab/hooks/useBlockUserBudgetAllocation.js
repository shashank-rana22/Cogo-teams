import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBlockUserBudgetAllocation = ({ setBlock = () => {}, refetch = () => {} }) => {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_agent_budget_allocation_status',
			method : 'POST',
			scope,
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

			refetch();
			setBlock(false);
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
