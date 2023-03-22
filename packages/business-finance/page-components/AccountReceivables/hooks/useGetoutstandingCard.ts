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

const useGetOutstandingCard = (organizationId) => {
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

	const { date, search, orgId, ...restFilters } = invoiceFilters || {};

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	const getOrganizationInvoices = async () => {
		try {
			await listApi({
				params: {
					...(restFilters || {}),
					startDate:
						date
						&& format(
							date?.startDate,
							'yyyy-MM-dd 00:00:00',
							{},
							false,
						),
					endDate:
						date
						&& format(
							date?.endDate,
							'yyyy-MM-dd 00:00:00',
							{},
							false,
						),
					query : query !== '' ? query : undefined,
					role  : userData.id,
					orgId,
				},
			});
		} catch (e) {
			if (e?.error?.message) { Toast.error(e?.error?.message || 'Failed'); }
		}
	};

	useEffect(() => {
		getOrganizationInvoices();
	}, [
		JSON.stringify(restFilters),
		query,
		date,
	]);

	const clearInvoiceFilters = () => {
		setinvoiceFilters((prev) => ({
			...prev,
			page          : 1,
			cogoEntity    : undefined,
			invoiceNumber : undefined,
			zone          : undefined,
			date          : undefined,
			invoiceStatus : undefined,
			search        : undefined,
			status        : undefined,
			services      : undefined,
			migrated      : undefined,
			shipmentType  : undefined,
		}));
	};

	return {
		listData,
		invoiceFilters,
		setinvoiceFilters,
		getOrganizationInvoices,
		invoiceLoading: listLoading,
		clearInvoiceFilters,
	};
};

export default useGetOutstandingCard;
