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
	jobNumber?: string;
	jobType?:string;
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

	if (authorizationparameters?.split(':')?.[1] === 'across_all') {
		let check = true;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		check = false;
	}

	const [
		{ loading: billsApiLoading },
		listExpenseInvoicesTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/bills/list',
			method  : 'get',
			authKey : 'get_purchase_bills_list',
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
			authKey : 'get_sales_invoice_list',
		},
		{ autoCancel: false },
	);

	const listExpenseInvoicesApi = (
		restFilters: DataType,
		currentPage: DataType,
	) => listExpenseInvoicesTrigger({
		params: {
			jobNumbers    : params.jobNumber ? [params?.jobNumber] : undefined,
			jobSource     : 'LOGISTICS',
			jobType       : params?.jobType || undefined,
			q             : q || undefined,
			...restFilters,
			amountTab     : undefined,
			pageIndex     : currentPage || restFilters?.pageIndex,
			excludeStatus : 'INITIATED',
			pageSize      : 10,
		},
	});

	const listSalesInvoicesApi = (
		restFilters: DataType,
		currentPage: DataType,
	) => listSalesInvoicesTrigger({
		params: {
			jobNumber                 : params?.jobNumber,
			jobSource                 : 'LOGISTICS',
			jobType                   : params?.jobType || undefined,
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
	}, [fullResponse, params]);

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
