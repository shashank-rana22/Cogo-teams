import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetSelectedInvoices = ({ apiData, setApiData }) => {
	const { query: urlQuery } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const {
		entity = '',
		currency,
		payrun,
	} = urlQuery || {};
	const [filters, setFIlters] = useState({ pageIndex: 1, pageSize: 10 });
	const { pageIndex, pageSize } = filters;
	const [
		{
			data: selectedInvoices,
			loading: selectedInvoiceLoading,
		},
		selectedInvoiceTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);
	const getInvoices = useCallback(
		async () => {
			try {
				await selectedInvoiceTrigger({
					params: {
						pageIndex  : pageIndex || undefined,
						pageSize   : pageSize || undefined,
						currency   : currency || undefined,
						entityCode : entity || undefined,
						payrunId   : payrun,
					},
				});
			} catch (e) {
				setApiData({});
				toastApiError(e);
			}
		},
		[pageIndex, pageSize, payrun, entity, currency, selectedInvoiceTrigger, setApiData],
	);

	useEffect(() => {
		setApiData(selectedInvoices);
	}, [selectedInvoices, setApiData]);

	useEffect(() => {
		if (payrun) {
			getInvoices();
		}
	}, [getInvoices, payrun]);

	return ({ apiData, setFIlters, filters, selectedInvoiceLoading, getInvoices });
};

export default useGetSelectedInvoices;
