import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateBudgetAllocation = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_agent_budget_allocation',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateBudget = async ({ value = {}, inputValue }) => {
		const { agent_id = '' } = value || {};
		try {
			const payload = {
				agent_id,
				amount: inputValue || undefined,
			};
			await trigger({
				data: payload,
			});
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		updateBudget,
	};
};

export default useUpdateBudgetAllocation;
