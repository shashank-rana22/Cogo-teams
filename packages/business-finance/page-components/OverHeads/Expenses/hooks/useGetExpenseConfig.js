import { useRequestBf } from '@cogoport/request';
import { useContext, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError';
import { EntityContext } from '../../commons/Contexts';

const useGetExpenseConfig = ({ id }) => {
	const entity = useContext(EntityContext);
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/expense-configuration',
			method  : 'get',
			authKey : 'get_purchase_expense_expense_configuration',
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
							cogoEntityId: entity,
						},
					},
				);
			} catch (err) {
				toastApiError(err);
			}
		};
		api();
	}, [trigger, id, entity]);

	return {
		loading,
		stakeholders: data,
	};
};

export default useGetExpenseConfig;
