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
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger({
					params: {
						category     : (expenseCategory || '').toUpperCase() || undefined,
						level        : 1,
						entityCodeId : '6fd98605-9d5d-479d-9fac-cf905d292b88',
					},
				});
			} catch (err) {
				Toast.error('Stakeholder does not exist for the selected category and cogo entity !');
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
