import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const FIRST = 1;
const SECOND = 2;

function formatToTimeStamp(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + FIRST).padStart(SECOND, '0');
	const day = String(date.getDate()).padStart(SECOND, '0');
	const hours = String(date.getHours()).padStart(SECOND, '0');
	const minutes = String(date.getMinutes()).padStart(SECOND, '0');
	const seconds = String(date.getSeconds()).padStart(SECOND, '0');
	const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
	return timestamp;
}

function useGetBillsList({ activeTab }) {
	const [billsFilters, setBillsFilters] = useState({ invoiceView: 'coe_accepted', pageSize: 10, pageIndex: 1 });
	const [orderBy, setOrderBy] = useState({});

	const {
		search = '', pageSize, pageIndex, invoiceView, category, currency, invoiceType, entity, urgencyTag,
		serviceType, invoiceDate, dueDate, updatedDate,
	} = billsFilters || {};

	const { dueDateSortType } = orderBy || {};

	const { startDate, endDate } = invoiceDate || {};
	const { startDate: fromBillDate, endDate: toBillDate } = dueDate || {};
	const { startDate: fromUploadBillDate, endDate: toUploadBillDate } = updatedDate || {};

	const { debounceQuery, query = '' } = useDebounceQuery();

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
						q                  : query || undefined,
						pageIndex          : pageIndex || undefined,
						pageSize           : pageSize || undefined,
						category           : category || undefined,
						invoiceView        : invoiceView || undefined,
						currency           : currency || undefined,
						invoiceType        : invoiceType || undefined,
						entity             : entity || undefined,
						urgencyTag         : urgencyTag || undefined,
						type               : activeTab || undefined,
						serviceType        : serviceType || undefined,
						dueDateSortType    : dueDateSortType || undefined,
						startDate          : startDate ? formatToTimeStamp(startDate) : undefined,
						endDate            : endDate ? formatToTimeStamp(endDate) : undefined,
						fromBillDate       : fromBillDate ? formatToTimeStamp(fromBillDate) : undefined,
						toBillDate         : toBillDate ? formatToTimeStamp(toBillDate) : undefined,
						fromUploadBillDate : toBillDate ? formatToTimeStamp(fromUploadBillDate) : undefined,
						toUploadBillDate   : toUploadBillDate ? formatToTimeStamp(toUploadBillDate) : undefined,
					},
				});
			} catch (e) {
				toastApiError(e);
			}
		},
		[pageIndex, pageSize,
			query, currency, urgencyTag, entity, invoiceType,
			invoiceView, category, dueDateSortType, serviceType, startDate,
			endDate, fromBillDate,
			toBillDate, fromUploadBillDate,
			toUploadBillDate, activeTab, billsTrigger],
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
