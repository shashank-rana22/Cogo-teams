import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface NestedObj {
	[key: string]: string;
}
interface FilterProps {
	activeEntity: string;
	sort: NestedObj;
}
const useGetAdvancePaymentList = ({ activeEntity, sort }:FilterProps) => {
	const [filters, setFilters] = useState({
		search    : undefined,
		service   : undefined,
		pageIndex : 1,
	});
	const { search, service, pageIndex } = filters || {};
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
						pageIndex,
						pageSize    : 10,
						hasPayrun   : false,
						q           : query !== '' ? query : undefined,
						entityCode  : activeEntity,
						serviceType : service || undefined,
						...sort,
					},
				});
			} catch (err) {
				Toast.error(err.meessage);
			}
		})();
	}, [query, trigger, activeEntity, service, pageIndex, sort]);
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
