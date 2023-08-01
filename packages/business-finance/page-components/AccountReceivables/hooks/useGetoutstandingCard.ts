import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

type DueDate = {
	startDate?: Date,
	endDate?: Date,
};

type InvoiceDate = {
	startDate?: Date,
	endDate?: Date,
};

type DateObj = {
	startDate?: Date,
	endDate?: Date,
};

interface InvoiceFilterProps {
	page : number,
	pageLimit: number,
	date?: DateObj,
	search?: string,
	dueDate?: DueDate,
	invoiceDate?: InvoiceDate,
	orgId?: string,
	migrated?: string,
	status?: string,
	invoiceStatus?: string,
	services?: string[],
	currency?: string
}

const useGetOutstandingCard = (organizationId: string, entityCode: string) => {
	const { userData } = useSelector(({ profile }) => ({
		userData: profile?.user || {},
	}));

	const { query = '', debounceQuery } = useDebounceQuery();

	const [invoiceFilters, setinvoiceFilters] = useState<InvoiceFilterProps>({
		page      : 1,
		pageLimit : 10,
		orgId     : organizationId,
		status    : 'unpaid',
	});

	const [sort, setSort] = useState({
		sortType : 'desc',
		sortBy   : 'invoiceDate',
	});

	const [
		{ data: listData, loading: listLoading },
		listApi,
	] = useRequestBf(
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
		page, pageLimit, migrated, status, invoiceStatus,
		services, search, dueDate, invoiceDate, orgId,
	} = invoiceFilters || {};

	const dueDateStart = dueDate && format(dueDate?.startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);
	const dueDateEnd = dueDate && format(dueDate?.endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);

	const invoiceDateStart = invoiceDate
	&& format(invoiceDate?.startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);
	const invoiceDateEnd = invoiceDate
	&& format(invoiceDate?.endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const getOrganizationInvoices = useCallback(async (filters) => {
		const dueDateStartFilter = filters?.dueDate
		&& format(filters?.dueDate?.startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);
		const dueDateEndFilter = filters?.dueDate
		&& format(filters?.dueDate?.endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);

		const invoiceDateStartFilter = filters?.invoiceDate
		&& format(filters?.invoiceDate?.startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);
		const invoiceDateEndFilter = filters?.invoiceDate
		&& format(filters?.invoiceDate?.endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'], {}, false);

		try {
			await listApi({
				params: {
					page,
					pageLimit,
					migrated         : migrated || undefined,
					status           : status || undefined,
					invoiceStatus    : invoiceStatus || undefined,
					services         : filters?.services || undefined,
					query            : query !== '' ? query : undefined,
					role             : userData.id,
					orgId            : orgId || undefined,
					dueDateStart     : dueDateStartFilter || undefined,
					dueDateEnd       : dueDateEndFilter || undefined,
					invoiceDateStart : invoiceDateStartFilter || undefined,
					invoiceDateEnd   : invoiceDateEndFilter || undefined,
					cogoEntity       : entityCode || undefined,
					currency         : filters?.currency || undefined,
					sortBy           : sort.sortBy || undefined,
					sortType         : sort.sortType || undefined,
				},

			});

			if (sort.sortBy === 'grandTotal' && filters?.currency === undefined) {
				Toast.warn('Please apply currency filter to sort invoice amount accurately');
			}
		} catch (e) {
			if (e?.error?.message) { Toast.error(e?.error?.message || 'Failed'); }
		}
	}, [listApi, page, pageLimit,
		migrated, status, invoiceStatus, query, userData.id, orgId, entityCode, sort.sortBy, sort.sortType]);

	const sendReport = async () => {
		try {
			await downloadApi({
				params: {
					page,
					pageLimit,
					migrated      : migrated || undefined,
					status        : status || undefined,
					invoiceStatus : invoiceStatus || undefined,
					services      : services || undefined,
					orgId,
					dueDateStart,
					dueDateEnd,
					invoiceDateStart,
					invoiceDateEnd,
					query         : query !== '' ? query : undefined,
					performedBy   : userData.id,
				},
			});
			Toast.success('Report Sent Successfully');
		} catch (e) {
			if (e?.error?.message) { Toast.error(e?.error?.message || 'Failed to Send Report'); }
		}
	};

	useEffect(() => {
		getOrganizationInvoices();
	}, [query, getOrganizationInvoices]);

	const clearInvoiceFilters = () => {
		setinvoiceFilters((prev) => ({
			...prev,
			page          : 1,
			invoiceStatus : undefined,
			search        : undefined,
			status        : undefined,
			services      : undefined,
			migrated      : undefined,
			invoiceDate   : undefined,
			dueDate       : undefined,
			currency      : undefined,
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
