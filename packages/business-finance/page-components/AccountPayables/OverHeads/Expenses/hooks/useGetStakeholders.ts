import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStakeholders = (expenseCategory:string) => {
	const [{ data }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/stakeholder',
			method  : 'get',
			authKey : 'purchase_expense_stakeholder',
		},
		{ autoCancel: false },
	);

	const api = async () => {
		try {
			await trigger({
				params: {
					category : expenseCategory || undefined,
					level    : 1,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	useEffect(() => {
		api();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		stakeholdersData: data?.data,
	};
};

export default useGetStakeholders;
