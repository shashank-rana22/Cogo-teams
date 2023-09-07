import { useRequestBf } from '@cogoport/request';
import { useContext, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import { EntityContext } from '../../commons/Contexts';
import { globalEntityFilter } from '../../commons/GlobalEntityFilter';

const useGetStakeholder = ({ billId }) => {
	const entity = useContext(EntityContext);
	const entityId = globalEntityFilter({ entity });
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'get',
			authKey : 'get_purchase_expense_by_id',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger(
					{
						params: {
							id           : billId,
							cogoEntityId : entityId,
						},
					},
				);
			} catch (err) {
				toastApiError(err);
			}
		};
		api();
	}, [trigger, billId, entityId]);

	return {
		loading,
		stakeholders: data,
	};
};

export default useGetStakeholder;
