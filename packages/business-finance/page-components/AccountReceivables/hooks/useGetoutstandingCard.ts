/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

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
	ageingKey?: any,
	orgId?: string
}

const useGetOutstandingCard = (organizationId: string) => {
	const { query = '', debounceQuery } = useDebounceQuery();

	const [invoiceFilters, setinvoiceFilters] = useState<InvoiceFilterProps>({
		page      : 1,
		pageLimit : 10,
		orgId     : organizationId,
	});

	const { userData } = useSelector(({ profile }) => ({
		userData: profile?.user || {},
	}));

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

	const [, downloadApi] = useRequestBf(
		{
			url     : '/sales/report/download/outstanding/list',
			method  : 'get',
			authKey : 'get_sales_report_download_outstanding_list',
		},
		{ manual: true },
	);

	const { date, search, dueDate, invoiceDate, orgId, ...restFilters } = invoiceFilters || {};

	const dueDateStart = dueDate && format(dueDate?.startDate, 'yyyy-MM-dd', {}, false);
	const dueDateEnd = dueDate && format(dueDate?.endDate, 'yyyy-MM-dd', {}, false);

	const invoiceDateStart = invoiceDate && format(invoiceDate?.startDate, 'yyyy-MM-dd', {}, false);
	const invoiceDateEnd = invoiceDate && format(invoiceDate?.endDate, 'yyyy-MM-dd', {}, false);

	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const getOrganizationInvoices = async () => {
		try {
			await listApi({
				params: {
					...(restFilters || {}),
					query : query !== '' ? query : undefined,
					role  : userData.id,
					orgId,
					dueDateStart,
					dueDateEnd,
					invoiceDateStart,
					invoiceDateEnd,
				},
			});
		} catch (e) {
			if (e?.error?.message) { Toast.error(e?.error?.message || 'Failed'); }
		}
	};

	const sendReport = async () => {
		try {
			await downloadApi({
				params: {
					...(restFilters || {}),
					dueDateStart,
					dueDateEnd,
					invoiceDateStart,
					invoiceDateEnd,
					query       : query !== '' ? query : undefined,
					performedBy : userData.id,
				},
			});
			Toast.success('Report Sent Successfully');
		} catch (e) {
			if (e?.error?.message) { Toast.error(e?.error?.message || 'Failed to Send Report'); }
		}
	};

	useEffect(() => {
		getOrganizationInvoices();
	}, [
		JSON.stringify(restFilters),
		query,
		dueDate,
		invoiceDate,
	]);

	const clearInvoiceFilters = () => {
		setinvoiceFilters((prev) => ({
			...prev,
			page          : 1,
			invoiceNumber : undefined,
			invoiceStatus : undefined,
			search        : undefined,
			status        : undefined,
			services      : undefined,
			migrated      : undefined,
			shipmentType  : undefined,
			invoiceDate   : undefined,
			dueDate       : undefined,
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
	};
};

export default useGetOutstandingCard;
