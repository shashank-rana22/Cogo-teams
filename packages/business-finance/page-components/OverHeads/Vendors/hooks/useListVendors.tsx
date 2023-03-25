import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useListVendors = ({ filters, sort }) => {
	const { page, pageLimit } = filters;
	const { paymentSortType, openInvoiceSortType, createdAtSortType } = sort;
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/expense/list-vendors',
			method  : 'get',
			authKey : 'list_vendors',
		},
		{ manual: true },
	);

	useEffect(() => {
		try {
			trigger({
				params: {
					entityCodeId               : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
					page_limit                 : pageLimit,
					page,
					verification_data_required : true,
					paymentSortType            : paymentSortType || undefined,
					openInvoiceSortType        : openInvoiceSortType || undefined,
					createdAtSortType          : createdAtSortType || undefined,
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
	]);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
