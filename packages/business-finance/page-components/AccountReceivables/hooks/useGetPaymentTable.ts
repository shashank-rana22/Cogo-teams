import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetPaymentTable(organizationId: string, entityCode?: number) {
	const [paymentFilters, setPaymentFilters] = useState({
		page       : 1,
		pageLimit  : 10,
		orgId      : organizationId,
		statusList : [],
		query      : '',
	});

	const [orderBy, setOrderBy] = useState({
		sortType : 'Desc',
		sortBy   : 'transactionDate',
	});

	const { query, pageLimit, page, orgId, statusList } = paymentFilters || {};

	const { debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(query);
	}, [query, debounceQuery]);

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

	useEffect(
		() => {
			const refetch = () => {
				try {
					paymentApi({
						params: {
							query      : query || undefined,
							orgId      : orgId || undefined,
							page       : page || undefined,
							pageLimit  : pageLimit || undefined,
							sortType   : orderBy.sortType,
							sortBy     : orderBy.sortBy,
							statusList : statusList || undefined,
							entityCode : entityCode || undefined,
						},
					});
				} catch (e) {
					Toast.error(e?.message);
				}
			};
			refetch();
		},
		[orderBy.sortBy, orderBy.sortType, orgId, page, pageLimit, paymentApi, query, statusList, entityCode],
	);

	return {
		paymentList,
		paymentLoading,
		paymentFilters,
		setPaymentFilters,
		orderBy,
		setOrderBy,
	};
}

export default useGetPaymentTable;
