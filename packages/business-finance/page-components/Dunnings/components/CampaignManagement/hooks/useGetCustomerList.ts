import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetCustomerList = ({ formData, search, page, setPage }) => {
	const {
		cogoEntityDetails, creditController, serviceType,
		ageingBucket, totalDueOutstanding,
	} = formData || {};
	const [
		{ data: customerList, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/customer-outstanding-and-on-account',
			method  : 'get',
			authKey : 'payments_dunning_customer_outstanding_and_on_account',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
		setPage(1);
	}, [search, debounceQuery, setPage]);

	const getCustomerList = useCallback((async () => {
		try {
			await trigger({
				params: {
					query                      : search || undefined,
					cogoEntityId               : JSON.parse(cogoEntityDetails || '{}')?.id,
					serviceTypes               : serviceType,
					organizationStakeholderIds : creditController,
					ageingBucket,
					totalDueOutstanding,
					dueOutstandingCurrency     : JSON.parse(cogoEntityDetails || '{}')?.currency,
					pageIndex                  : page,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}), [ageingBucket, cogoEntityDetails, creditController,
		page, search, serviceType, totalDueOutstanding, trigger]);

	useEffect(() => {
		getCustomerList();
	}, [query, page, getCustomerList]);

	return {
		customerList,
		loading,
	};
};
export default useGetCustomerList;
