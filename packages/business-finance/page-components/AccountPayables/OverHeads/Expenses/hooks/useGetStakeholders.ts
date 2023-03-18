import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStakeholders = (expenseCategory:string) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/stakeholder',
			method  : 'get',
			authKey : 'purchase_expense_stakeholder',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger({
					params: {
						category : (expenseCategory || '').toUpperCase() || undefined,
						level    : 1,
					},
				});
			} catch (err) {
				Toast.error('Something went wrong');
			}
		};

		api();
	}, [trigger, expenseCategory]);

	return {
		stakeholdersData: data?.data,
		loading,
	};
};

export default useGetStakeholders;
