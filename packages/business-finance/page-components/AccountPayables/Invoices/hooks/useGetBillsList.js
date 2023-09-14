import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

function formatToTimeStamp(dateString = '') {
	const date = new Date(dateString);
	const formatedDate = formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : 'T',
	});
	return formatedDate;
}
function useGetBillsList({
	activeTab = '',
	activeEntity = '',
	organizationId = '',
	showElement = false,
}) {
	const [billsFilters, setBillsFilters] = useState({
		invoiceView : 'coe_accepted',
		entity      : activeEntity,
		pageSize    : 10,
		pageIndex   : 1,
	});
	const [orderBy, setOrderBy] = useState({});

	const {
		search = '', pageSize = 10, pageIndex = 1, invoiceView = '', category = '', currency = '',
		invoiceType = '', urgencyTag = '', services = '', invoiceDate = {}, dueDate = {}, updatedDate = {},
	} = billsFilters || {};

	const { dueDateSortType = '' } = orderBy || {};

	const { startDate = '', endDate = '' } = invoiceDate || {};
	const { startDate: fromBillDate = '', endDate: toBillDate = '' } = dueDate || {};
	const { startDate: fromUploadBillDate = '', endDate: toUploadBillDate = '' } = updatedDate || {};

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
						entity             : activeEntity || undefined,
						urgencyTag         : urgencyTag || undefined,
						type               : activeTab || undefined,
						services           : services || undefined,
						dueDateSortType    : dueDateSortType || undefined,
						startDate          : startDate ? formatToTimeStamp(startDate) : undefined,
						endDate            : endDate ? formatToTimeStamp(endDate) : undefined,
						fromBillDate       : fromBillDate ? formatToTimeStamp(fromBillDate) : undefined,
						toBillDate         : toBillDate ? formatToTimeStamp(toBillDate) : undefined,
						fromUploadBillDate : toBillDate ? formatToTimeStamp(fromUploadBillDate) : undefined,
						toUploadBillDate   : toUploadBillDate ? formatToTimeStamp(toUploadBillDate) : undefined,
						organizationId     : organizationId || undefined,
					},
				});
			} catch (e) {
				toastApiError(e);
			}
		},
		[pageIndex, pageSize,
			query, currency, urgencyTag, invoiceType,
			invoiceView, category, dueDateSortType, services, startDate,
			endDate, fromBillDate,
			toBillDate, fromUploadBillDate,
			toUploadBillDate, billsTrigger, activeTab, organizationId, activeEntity],
	);

	useEffect(() => {
		if (showElement) {
			refetch();
		}
	}, [refetch, showElement]);

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
