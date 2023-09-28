import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePromotionBudgetAmount = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_budget_amount',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateBudgetAmount = async ({ data = {}, refetchDashboard = () => {} }) => {
		try {
			await trigger({
				data,
			});
			refetchDashboard();
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		updateBudgetAmount,
		loading,
	};
};

export default useUpdatePromotionBudgetAmount;
