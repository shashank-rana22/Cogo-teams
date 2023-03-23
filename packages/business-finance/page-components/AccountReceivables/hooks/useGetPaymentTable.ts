import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetPaymentTable(organizationId) {
	const [paymentFilters, setPaymentFilters] = useState({
		page       : 1,
		pageLimit  : 10,
		orgId      : '23a8a7f2-177b-4ef8-bc31-55548240a2d7',
		statusList : [],
		query      : '',
	});

	const [orderBy, setOrderBy] = useState({
		sortType : 'Desc',
		sortBy   : 'transactionDate',
	});

	const { query, ...rest } = paymentFilters || {};

	const { debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(query);
	}, [query]);

	console.log('orderBy', orderBy);

	const [
		{ data: paymentList, loading: paymentLoading },
		paymentApi,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/customer-payment',
			method  : 'get',
			authKey : 'get_payments_outstanding_customer_payment',
		},
		{ manual: true },
	);

	const refetch = () => {
		try {
			paymentApi({
				params: {
					...rest,
					...orderBy,
					query: query || undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(
		() => {
			refetch();
		},
		[JSON.stringify(paymentFilters), JSON.stringify(orderBy)],
	);

	return {
		paymentList,
		paymentLoading,
		refetch,
		paymentFilters,
		setPaymentFilters,
		orderBy,
		setOrderBy,
	};
}

export default useGetPaymentTable;
