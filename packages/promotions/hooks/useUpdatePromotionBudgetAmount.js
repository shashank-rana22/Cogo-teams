import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePromotionBudgetAmount = ({
	budgetId,
	budgetValue,
	refetchDashboard = () => {},
}) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_budget_amount',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateBudgetAmount = async () => {
		const payload = {
			id     : budgetId,
			amount : parseFloat(budgetValue),
		};
		try {
			await trigger({
				data: payload,
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
