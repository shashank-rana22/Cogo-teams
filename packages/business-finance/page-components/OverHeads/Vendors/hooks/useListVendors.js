import { useRequestBf } from '@cogoport/request';
import { useEffect, useContext } from 'react';

import { EntityContext } from '../../commons/Contexts';

const useListVendors = ({ filters, sort }) => {
	const {
		page, pageLimit, paymentStatus, CATEGORY, searchValue,
	} = filters;
	const entityCode = useContext(EntityContext);

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
					pageSize                   : pageLimit,
					pageIndex                  : page,
					verification_data_required : true,
					paymentSortType            : paymentSortType || undefined,
					openInvoiceSortType        : openInvoiceSortType || undefined,
					createdAtSortType          : createdAtSortType || undefined,
					paymentStatus              : paymentStatus || undefined,
					category                   : CATEGORY || undefined,
					q                          : searchValue || undefined,
					cogoEntityId               : entityCode,
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
		paymentStatus, CATEGORY, searchValue,
		entityCode,
	]);

	return {
		listData: data,
		loading,
	};
};

export default useListVendors;
