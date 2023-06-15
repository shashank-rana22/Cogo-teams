import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError';

function formatToTimeStamp(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	return timestamp;
}

function useGetBillsList({ activeTab }) {
	const [billsFilters, setBillsFilters] = useState({ invoiceView: 'coe_accepted', pageSize: 10, pageIndex: 1 });
	const [orderBy, setOrderBy] = useState({});

	const {
		search, pageSize, pageIndex, invoiceView, category, currency, invoiceType, entity, urgencyTag,
		serviceType, invoiceDate, dueDate, updatedDate,
	} = billsFilters || {};

	const { startDate, endDate } = invoiceDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } = updatedDate || {};
	const { sortType, sortBy } = orderBy || {};

	const { debounceQuery, query } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const [{ data: billsData, loading: billsLoading }, billsTrigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ manual: true },
	);

	const refetch = useCallback(
		async () => {
			try {
				await billsTrigger({
					params: {
						query              : query || undefined,
						pageIndex          : pageIndex || undefined,
						pageSize           : pageSize || undefined,
						sortType           : sortType || undefined,
						sortBy             : sortBy || undefined,
						category           : category || undefined,
						invoiceView        : invoiceView || undefined,
						currency           : currency || undefined,
						invoiceType        : invoiceType || undefined,
						entity             : entity || undefined,
						urgencyTag         : urgencyTag || undefined,
						orderBy            : orderBy || undefined,
						type               : activeTab || undefined,
						serviceType        : serviceType || undefined,
						startDate          : startDate ? formatToTimeStamp(startDate) : undefined,
						endDate            : endDate ? formatToTimeStamp(endDate) : undefined,
						fromBillDate       : fromBillDate ? formatToTimeStamp(fromBillDate) : undefined,
						toBillDate         : toBillDate ? formatToTimeStamp(toBillDate) : undefined,
						fromUploadBillDate : toBillDate ? formatToTimeStamp(toBillDate) : undefined,
						toUploadBillDate   : toUploadBillDate ? formatToTimeStamp(toUploadBillDate) : undefined,
					},
				});
			} catch (e) {
				toastApiError(e);
			}
		},
		[sortBy, sortType, pageIndex, pageSize,
			query, currency, urgencyTag, entity, invoiceType,
			invoiceView, category, orderBy, serviceType, startDate,
			endDate, fromBillDate,
			toBillDate, fromUploadBillDate,
			toUploadBillDate, activeTab],
	);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		billsData,
		billsLoading,
		billsFilters,
		setBillsFilters,
		orderBy,
		setOrderBy,
	};
}

export default useGetBillsList;
