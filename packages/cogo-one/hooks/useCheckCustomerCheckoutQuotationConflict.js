import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useCheckCustomerQuotationConflict = ({ orgId = '' }) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/check_customer_checkout_quotation_conflict',
		},
		{ manual: true, autoCancel: false },
	);

	const checkDuplicacy = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id: orgId,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [orgId, trigger]);

	useEffect(() => {
		if (orgId) {
			checkDuplicacy();
		}
	}, [checkDuplicacy, orgId]);

	return {
		quotationSentData: data,
		loading,
		checkDuplicacy,
	};
};

export default useCheckCustomerQuotationConflict;
