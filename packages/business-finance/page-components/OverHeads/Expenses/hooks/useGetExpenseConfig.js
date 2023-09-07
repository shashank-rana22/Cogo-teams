import { useRequestBf } from '@cogoport/request';
import { useContext, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import { EntityContext } from '../../commons/Contexts';
import { globalEntityFilter } from '../../commons/GlobalEntityFilter';

const useGetExpenseConfig = ({ id }) => {
	const entity = useContext(EntityContext);
	const entityId = globalEntityFilter({ entity });
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/expense-configuration',
			method  : 'get',
			authKey : 'get_purchase_expense_expense_configuration_by_id',
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
							cogoEntityId: entityId,
						},
					},
				);
			} catch (err) {
				toastApiError(err);
			}
		};
		api();
	}, [trigger, id, entityId]);

	return {
		loading,
		stakeholders: data,
	};
};

export default useGetExpenseConfig;
