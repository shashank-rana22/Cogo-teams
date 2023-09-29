import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import { flattenErrorToString } from '../helpers/error-helper';

const useUpdateBudgetAllocation = ({ setShowSaveLink = () => {}, refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_agent_budget_allocation',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateBudget = async (value, inputValue) => {
		const { agent_id = '' } = value;
		try {
			const payload = {
				agent_id,
				amount: inputValue || undefined,
			};
			await trigger({
				data: payload,
			});
			refetch();
			setShowSaveLink(false);
		} catch (error) {
			Toast.error(flattenErrorToString(error.error));
		}
	};

	return {
		loading,
		updateBudget,
	};
};

export default useUpdateBudgetAllocation;
