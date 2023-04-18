import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetAdvancePaymentList = ({ activeEntity }) => {
	const [filters, setFilters] = useState({
		search  : undefined,
		service : undefined,
	});
	const { search, service } = filters || {};
	const { query = '', debounceQuery } = useDebounceQuery();
	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/advance-document/list',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill_list_advance_payments',
		},
		{ manual: true, autoCancel: false },
	);

	const getAdvancedPayment = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						pageIndex  : 1,
						pageSize   : 20,
						q          : query !== '' ? query : undefined,
						entityCode : activeEntity,
						service,
					},
				});
			} catch (err) {
				Toast.error(err.meessage);
			}
		})();
	}, [query, trigger, activeEntity, service]);
	useEffect(() => {
		getAdvancedPayment();
	}, [getAdvancedPayment]);

	return {
		data,
		loading,
		filters,
		setFilters,
	};
};
export default useGetAdvancePaymentList;
