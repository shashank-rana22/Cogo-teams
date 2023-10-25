import { useRequestBf } from '@cogoport/request';
import { useContext, useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError';
import { EntityContext } from '../../commons/Contexts';

const useGetStakeholder = ({ billId }) => {
	const entity = useContext(EntityContext);
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense',
			method  : 'get',
			authKey : 'get_purchase_expense',
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
							cogoEntityId : entity,
						},
					},
				);
			} catch (err) {
				toastApiError(err);
			}
		};
		api();
	}, [trigger, billId, entity]);

	return {
		loading,
		stakeholders: data,
	};
};

export default useGetStakeholder;
