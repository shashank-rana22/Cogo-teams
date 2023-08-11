import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

interface FormData {
	cogoEntityId?: string;
	creditController?: string[];
	serviceType?: string[];
	ageingBucket?: string;
	totalDueOutstanding?: number | string;
	dueOutstandingCurrency?: string;
	pageIndex?: number | string;
}

interface Props {
	formData?: FormData;
	search?: string;
	setFormData?: Function;
}

const useGetCustomerList = ({ formData, search, setFormData }:Props) => {
	const {
		cogoEntityId, creditController, serviceType,
		ageingBucket, totalDueOutstanding, dueOutstandingCurrency,
		pageIndex,
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
		setFormData((prev) => ({
			...prev,
			pageIndex: 1,
		}));
	}, [search, debounceQuery, setFormData]);

	const getCustomerList = useCallback((() => {
		try {
			trigger({
				params: {
					query                      : !isEmpty(query) ? query : undefined,
					cogoEntityId,
					serviceTypes               : serviceType,
					organizationStakeholderIds : !isEmpty(creditController) ? creditController : undefined,
					ageingBucket,
					totalDueOutstanding,
					dueOutstandingCurrency,
					pageIndex,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}), [ageingBucket, cogoEntityId, creditController,
		dueOutstandingCurrency, pageIndex, query, serviceType,
		totalDueOutstanding, trigger]);

	useEffect(() => {
		getCustomerList();
	}, [query, pageIndex, getCustomerList]);

	return {
		customerList,
		loading,
	};
};
export default useGetCustomerList;
