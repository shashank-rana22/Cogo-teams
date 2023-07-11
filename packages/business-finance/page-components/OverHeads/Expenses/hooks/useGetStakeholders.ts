import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStakeholders = ({ expenseCategory, entity, currency }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/stakeholder',
			method  : 'get',
			authKey : 'get_purchase_expense_stakeholder',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger({
					params: {
						entityCode : entity,
						currency,
						category   : expenseCategory || undefined,
						level      : 1,
					},
				});
			} catch (err) {
				console.log('error-', err);
			}
		};
		api();
	}, [trigger, entity, expenseCategory, currency]);

	return {
		stakeholdersData: data?.data,
		loading,
	};
};

export default useGetStakeholders;
