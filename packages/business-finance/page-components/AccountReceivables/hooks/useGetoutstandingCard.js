import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

const useGetOutstandingCard = ({ organizationId, entityCode_in_use:entityCode, limit = 10 }) => {
	const { userData } = useSelector(({ profile }) => ({
		userData: profile?.user || {},
	}));

	const { query = '', debounceQuery } = useDebounceQuery();

	const [invoiceFilters, setinvoiceFilters] = useState({
		page              : 1,
		pageLimit         : limit,
		orgId             : organizationId,
		paymentStatusList : ['unpaid', 'partial_paid'],
	});

	const [sort, setSort] = useState({
		sortType : 'desc',
		sortBy   : 'invoiceDate',
	});

	const [{ data: listData, loading: listLoading }, listApi] = useRequestBf(
		{
			url     : '/sales/outstanding/invoice-list',
			method  : 'get',
			authKey : 'get_sales_outstanding_invoice_list',
		},
		{ manual: true },
	);

	const [apiState, downloadApi] = useRequestBf(
		{
			url     : '/sales/report/download/outstanding/list',
			method  : 'get',
			authKey : 'get_sales_report_download_outstanding_list',
		},
		{ manual: true },
	);

	const {
		page,
		pageLimit,
		migrated,
		paymentStatusList,
		invoiceStatus,
		services,
		search,
		dueDate,
		invoiceDate,
		orgId,
	} = invoiceFilters || {};

	const dueDateStart = dueDate && format(
		dueDate?.startDate,
		GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		{},
		false,
	);
	const dueDateEnd = dueDate && format(
		dueDate?.endDate,
		GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		{},
		false,
	);

	const invoiceDateStart = invoiceDate && format(
		invoiceDate?.startDate,
		GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		{},
		false,
	);
	const invoiceDateEnd = invoiceDate && format(
		invoiceDate?.endDate,
		GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		{},
		false,
	);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const getOrganizationInvoices = useCallback(
		async (filters) => {
			const dueDateStartFilter = filters?.dueDate && format(
				filters?.dueDate?.startDate,
				GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				{},
				false,
			);
			const dueDateEndFilter = filters?.dueDate && format(
				filters?.dueDate?.endDate,
				GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				{},
				false,
			);

			const invoiceDateStartFilter = filters?.invoiceDate && format(
				filters?.invoiceDate?.startDate,
				GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				{},
				false,
			);
			const invoiceDateEndFilter = filters?.invoiceDate && format(
				filters?.invoiceDate?.endDate,
				GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				{},
				false,
			);

			try {
				await listApi({
					params: {
						page,
						pageLimit,
						migrated          : migrated || undefined,
						paymentStatusList : paymentStatusList || undefined,
						invoiceStatus     : invoiceStatus || undefined,
						services          : filters?.services || undefined,
						query             : query !== '' ? query : undefined,
						orgId             : orgId || undefined,
						dueDateStart      : dueDateStartFilter || undefined,
						dueDateEnd        : dueDateEndFilter || undefined,
						invoiceDateStart  : invoiceDateStartFilter || undefined,
						invoiceDateEnd    : invoiceDateEndFilter || undefined,
						cogoEntity        : entityCode || undefined,
						currency          : filters?.currency || undefined,
						sortBy            : sort.sortBy || undefined,
						sortType          : sort.sortType || undefined,
					},
				});

				if (
					sort.sortBy === 'grandTotal'
					&& filters?.currency === undefined
				) {
					Toast.warn(
						'Please apply currency filter to sort invoice amount accurately',
					);
				}
			} catch (e) {
				if (e?.error?.message) {
					Toast.error(e?.error?.message || 'Failed');
				}
			}
		},
		[
			listApi,
			page,
			pageLimit,
			migrated,
			paymentStatusList,
			invoiceStatus,
			query,
			orgId,
			entityCode,
			sort.sortBy,
			sort.sortType,
		],
	);

	const sendReport = async () => {
		try {
			await downloadApi({
				params: {
					page,
					pageLimit,
					migrated          : migrated || undefined,
					paymentStatusList : paymentStatusList || undefined,
					invoiceStatus     : invoiceStatus || undefined,
					services          : services || undefined,
					orgId,
					dueDateStart,
					dueDateEnd,
					invoiceDateStart,
					invoiceDateEnd,
					query             : query !== '' ? query : undefined,
					performedBy       : userData.id,
				},
			});
			Toast.success('Report Sent Successfully');
		} catch (e) {
			if (e?.error?.message) {
				Toast.error(e?.error?.message || 'Failed to Send Report');
			}
		}
	};

	useEffect(() => {
		getOrganizationInvoices({});
	}, [query, getOrganizationInvoices]);

	const clearInvoiceFilters = () => {
		setinvoiceFilters((prev) => ({
			...prev,
			page              : 1,
			invoiceStatus     : undefined,
			search            : undefined,
			paymentStatusList : undefined,
			services          : undefined,
			migrated          : undefined,
			invoiceDate       : undefined,
			dueDate           : undefined,
			currency          : undefined,
		}));
	};

	return {
		listData,
		invoiceFilters,
		setinvoiceFilters,
		getOrganizationInvoices,
		invoiceLoading: listLoading,
		clearInvoiceFilters,
		sendReport,
		apiState,
		sort,
		setSort,
	};
};

export default useGetOutstandingCard;
