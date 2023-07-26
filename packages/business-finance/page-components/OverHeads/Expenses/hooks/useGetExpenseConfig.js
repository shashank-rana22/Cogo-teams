import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetExpenseConfig = ({ id }) => {
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/expense-configuration',
			method  : 'get',
			authKey : 'get_purchase_expense_configuration_by_id',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger(
					{
						params: {
							id,
						},
					},
				);
			} catch (err) {
				toastApiError(err);
			}
		};
		api();
	}, [trigger, id]);

	return {
		loading,
		stakeholders: data,
	};
};

export default useGetExpenseConfig;
