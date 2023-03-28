import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStakeholders = (expenseCategory:string) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/stakeholder',
			method  : 'get',
			authKey : 'purchase_expense_stakeholder',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger({
					params: {
						category     : (expenseCategory || '').toUpperCase() || undefined,
						level        : 1,
						entityCodeId : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
					},
				});
			} catch (err) {
				console.log('error-', err);
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
