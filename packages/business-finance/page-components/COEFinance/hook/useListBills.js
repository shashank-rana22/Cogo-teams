import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { expenseConfig } from '../configurations/ShipmentIdView/expenseConfig';
import { incomeConfig } from '../configurations/ShipmentIdView/incomeConfig';
import quotationConfig from '../configurations/ShipmentIdView/quotationConfig.json';

import useGetFiniteList from './useGetFiniteList';
import useGetQuotation from './useGetQuotationBill';

const useListBills = (allParams) => {
	const [q, setQ] = useState('');

	const { ...params } = allParams || {};
	delete params.status;

	const { authorizationparameters } = useSelector(
		({ profile }) => ({
			authorizationparameters: profile?.authorizationparameters,
		}),
	);
	const { getQuotationData, quotationLoading, quoteData } = useGetQuotation({
		jobNumber       : params?.jobNumber,
		amountTab       : params?.amountTab,
		isCheckoutQuote : params?.isCheckoutQuote,
	});

	if (authorizationparameters?.split(':')?.[1] === 'across_all') {
		let check = true;
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

	const listExpenseInvoicesApi = (restFilters, currentPage) => listExpenseInvoicesTrigger({
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

	const listSalesInvoicesApi = (restFilters, currentPage) => listSalesInvoicesTrigger({
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

	const API_MAPPING = {
		expense   : listExpenseInvoicesApi,
		income    : listSalesInvoicesApi,
		sellQuote : getQuotationData,
		buyQuote  : getQuotationData,
	};

	const currentApi = API_MAPPING[params?.amountTab];

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

	const CONFIG_MAPPING = {
		expense   : expenseConfig,
		income    : incomeConfig,
		sellQuote : quotationConfig,
		buyQuote  : quotationConfig,
	};

	const config = CONFIG_MAPPING[params?.amountTab];

	const apiLoading = loading || billsApiLoading || invoicesApiLoading || quotationLoading;

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
		quoteData,
	};
};

export default useListBills;
