import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStakeholders = (expenseCategory) => {
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
					category: expenseCategory || undefined,
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
		stakeholders: data,
	};
};

export default useGetStakeholders;
