import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetStakeholder = ({ billId }) => {
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
							id: billId,
						},
					},
				);
			} catch (err) {
				toastApiError(err);
			}
		};
		api();
	}, [trigger, billId]);

	return {
		loading,
		stakeholders: data,
	};
};

export default useGetStakeholder;
