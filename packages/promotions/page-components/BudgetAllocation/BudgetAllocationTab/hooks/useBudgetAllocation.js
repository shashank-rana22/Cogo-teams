import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useBudgetAllocation = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotion_budget_allocation',
			method : 'POST',
		},
		{ manual: false },
	);

	const fetchCreateDataApi = async ({ payload }) => {
		try {
			await trigger({
				data: {
					...payload,
					budget_amount_currency: GLOBAL_CONSTANTS.currency_code.USD,
				},
			});
			refetch();
			Toast.success('Budget allocated successfully');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		fetchCreateDataApi,
		loading,
	};
};
export default useBudgetAllocation;
