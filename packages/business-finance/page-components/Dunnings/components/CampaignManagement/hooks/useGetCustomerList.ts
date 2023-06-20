import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface FormData {
	cogoEntityId?:string,
	creditController?:string[],
	serviceType?:string[],
	ageingBucket?:string,
	totalDueOutstanding?:number | string,
	dueOutstandingCurrency?:string,
}

interface Props {
	formData?:FormData,
	search?:string,
	page?:number,
	setPage?:Function,
}

const useGetCustomerList = ({ formData, search, page, setPage }:Props) => {
	const {
		cogoEntityId, creditController, serviceType,
		ageingBucket, totalDueOutstanding, dueOutstandingCurrency,
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
					query                      : query?.length > 0 ? query : undefined,
					cogoEntityId,
					serviceTypes               : serviceType,
					organizationStakeholderIds : creditController?.length > 0 ? creditController : undefined,
					ageingBucket,
					totalDueOutstanding,
					dueOutstandingCurrency,
					pageIndex                  : page,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}), [ageingBucket, cogoEntityId, creditController,
		dueOutstandingCurrency, page, query, serviceType,
		totalDueOutstanding, trigger]);

	useEffect(() => {
		getCustomerList();
	}, [query, page, getCustomerList]);

	return {
		customerList,
		loading,
	};
};
export default useGetCustomerList;
