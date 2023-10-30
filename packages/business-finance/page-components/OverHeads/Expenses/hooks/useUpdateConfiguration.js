import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateConfiguration = ({ id, userId, action }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/expense-configuration',
			method  : 'put',
			authKey : 'put_purchase_expense_expense_configuration',
		},
		{ manual: true },
	);

	const updateRecurringStatus = useCallback(async () => {
		try {
			await trigger({
				data: {
					id,
					status     : action,
					approvedBy : userId,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [action, id, trigger, userId]);

	return {
		updateRecurringStatus,
		recurringLoading  : loading,
		recurringResponse : data,
	};
};

export default useUpdateConfiguration;
