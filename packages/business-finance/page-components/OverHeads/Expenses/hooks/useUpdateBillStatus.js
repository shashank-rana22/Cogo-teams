import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdateBillStatus = ({ id, userId, action }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/status',
			method  : 'put',
			authKey : 'put_purchase_bills_status',
		},
		{ manual: true },
	);

	const updateNonRecurringStatus = useCallback(async () => {
		try {
			await trigger({
				data: {
					status              : action,
					id,
					updatedBy           : userId,
					performedByUserType : 'user',
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [action, id, trigger, userId]);

	return {
		updateNonRecurringStatus,
		nonRecurringLoading  : loading,
		nonRecurringResponse : data,
	};
};

export default useUpdateBillStatus;
