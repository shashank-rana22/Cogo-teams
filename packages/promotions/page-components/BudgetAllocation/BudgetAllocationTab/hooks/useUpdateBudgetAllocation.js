import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateBudgetAllocation = ({ refetch = () => {} }) => {
	const [showSaveLink, setShowSaveLink] = useState(false);

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
		showSaveLink,
		setShowSaveLink,
	};
};

export default useUpdateBudgetAllocation;
