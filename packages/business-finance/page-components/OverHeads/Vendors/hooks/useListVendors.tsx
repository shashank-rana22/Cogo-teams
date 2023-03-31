import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useListVendors = ({ filters, sort }) => {
	const { page, pageLimit, KYC_STATUS, CATEGORY, searchValue } = filters;
	const { paymentSortType, openInvoiceSortType, createdAtSortType } = sort;
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/expense/list-vendors',
			method  : 'get',
			authKey : 'get_purchase_expense_list_vendors',
		},
		{ manual: true, autoCancel: false },
	);

	useEffect(() => {
		try {
			trigger({
				params: {
					entityCodeId               : '6fd98605-9d5d-479d-9fac-cf905d292b88',
					page_limit                 : pageLimit,
					page,
					verification_data_required : true,
					paymentSortType            : paymentSortType || undefined,
					openInvoiceSortType        : openInvoiceSortType || undefined,
					createdAtSortType          : createdAtSortType || undefined,
					kycStatus                  : KYC_STATUS || undefined,
					category                   : CATEGORY || undefined,
					q                          : searchValue || undefined,
				},
			});
		} catch (err) {
			console.log('error-', err);
		}
	}, [
		page,
		trigger,
		pageLimit,
		paymentSortType,
		openInvoiceSortType,
		createdAtSortType,
		KYC_STATUS, CATEGORY, searchValue,
	]);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
