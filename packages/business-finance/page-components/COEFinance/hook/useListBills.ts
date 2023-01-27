import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { expenseConfig } from '../configurations/ShipmentIdView/expenseConfig';
import { incomeConfig } from '../configurations/ShipmentIdView/incomeConfig';

import useGetFiniteList from './useGetFiniteList';

interface DataType {
	currentPage: number;
	restFilters: any;
	pageIndex: number;
}
interface AllParams {
	billId?: number;
	billNumber?: number;
	orgId?: number;
	serial_id?: number;
	status?: string;
	amountTab?: string;
	setDataCard:Function
}
interface Profile {
	authorizationparameters?: string;
}
interface UseSelectorProps {
	profile?: Profile;
}
const useListBills = (allParams) => {
	const [q, setQ] = useState('');

	const { ...params }: AllParams = allParams || {};
	delete params.status;

	const { authorizationparameters } = useSelector(
		({ profile }: UseSelectorProps) => ({
			authorizationparameters: profile?.authorizationparameters,
		}),
	);

	let check = true;
	if (authorizationparameters?.split(':')?.[1] === 'across_all') {
		check = false;
	}

	const [
		{ loading: billsApiLoading },
		listExpenseInvoicesTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			authkey : 'get_purchase_bills_list',
		},
		{ autoCancel: false },
	);

	const [
		{ loading: invoicesApiLoading },
		listSalesInvoicesTrigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/list',
			method  : 'get',
			authkey : 'get_sales_invoice_list',
		},
		{ autoCancel: false },
	);

	const listExpenseInvoicesApi = (
		restFilters: DataType,
		currentPage: DataType,
	) => listExpenseInvoicesTrigger({
		params: {
			jobNumbers : params.serial_id ? [params?.serial_id] : undefined,
			jobSource  : 'LOGISTICS',
			jobType    : 'SHIPMENT',
			q          : q || undefined,
			...restFilters,
			...params,
			amountTab  : undefined,
			pageIndex  : currentPage || restFilters?.pageIndex,
			pageSize   : 10,
		},
	});

	const listSalesInvoicesApi = (
		restFilters: DataType,
		currentPage: DataType,
	) => listSalesInvoicesTrigger({
		params: {
			jobNumber                 : params?.serial_id,
			jobSource                 : 'LOGISTICS',
			jobType                   : 'SHIPMENT',
			q                         : q || undefined,
			isCreatedByDetailRequired : true,
			...restFilters,
			amountTab                 : undefined,
			page                      : currentPage || restFilters?.pageIndex,
			pageLimit                 : 10,
		},
	});

	const currentApi = params?.amountTab === 'expense'
		? listExpenseInvoicesApi
		: listSalesInvoicesApi;
	const {
		loading,
		page,
		filters,
		list: { fullResponse },
		hookSetters,
		refetch,
	} = useGetFiniteList(currentApi, {
		...(params || {}),
		q,
		authorizationparameters,
	});

	useEffect(() => {
		params.setDataCard(fullResponse?.list?.[0]?.job || fullResponse?.list?.[0]);
	}, [fullResponse]);

	const config = params?.amountTab === 'expense' ? expenseConfig : incomeConfig;

	const apiLoading = loading || billsApiLoading || invoicesApiLoading;
	return {
		loading : apiLoading,
		page,
		filters,
		list    : { fullResponse },
		hookSetters,
		refetch,
		setQ,
		q,
		config,
	};
};

export default useListBills;
