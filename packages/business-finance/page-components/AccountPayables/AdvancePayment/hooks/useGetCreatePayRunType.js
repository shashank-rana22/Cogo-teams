import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useState } from 'react';

const useGetCreatePayRunType = ({ activeEntity, currency, selectedPayRunId }) => {
	const [filters, setFilters] = useState({
		pageIndex: 1,
	});
	const { pageIndex } = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'get',
			authKey : 'get_purchase_payrun',
		},
		{ manual: true, autoCancel: false },
	);

	const getAdvancedPayment = useCallback(async () => {
		try {
			await trigger({
				params: {
					pageIndex,
					pageSize   : 10,
					type       : 'ADVANCE_PAYMENT',
					currency,
					state      : 'AUDITED',
					entityCode : activeEntity,
					id         : (selectedPayRunId === undefined || selectedPayRunId === '')
						? undefined : selectedPayRunId,
				},
			});
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	}, [activeEntity, currency, pageIndex, selectedPayRunId, trigger]);

	return {
		data,
		loading,
		filters,
		setFilters,
		getAdvancedPayment,
	};
};
export default useGetCreatePayRunType;
