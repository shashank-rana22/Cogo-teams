import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const PAGE = 1;
const useViewDataList = ({ id, docType, irnStatus, tradePartyGst }) => {
	const [page, setPage] = useState(PAGE);
	const [{ data, loading }, listTrigger] = useRequestBf(
		{
			url     : '/sales/outward/get-sales-register-invoices',
			method  : 'get',
			authKey : 'get_sales_outward_get_sales_register_invoices',
		},
		{ manual: true },
	);

	const [{ loading:deleteLoading }, deleteTrigger] = useRequestBf(
		{
			url     : '/sales/outward/remove-invoice',
			method  : 'put',
			authKey : 'put_sales_outward_remove_invoice',
		},
		{ manual: true },
	);
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(tradePartyGst);
	}, [debounceQuery, tradePartyGst]);

	const refetch = useCallback(async () => {
		try {
			await listTrigger({
				params: {
					id,
					docType       : docType || undefined,
					irnStatus     : irnStatus || undefined,
					tradePartyGst : query !== '' ? query : undefined,
					pageIndex     : page,
					pageSize      : 10,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [docType, id, irnStatus, listTrigger, page, query]);

	const deleteInvoice = async (idDeleteInvoice) => {
		try {
			await deleteTrigger({
				data: {
					id: idDeleteInvoice,
				},
			});
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	useEffect(() => {
		refetch();
	}, [refetch]);

	useEffect(() => {
		setPage(PAGE);
	}, [docType, irnStatus, query]);

	return {
		data,
		page,
		setPage,
		loading: deleteLoading || loading,
		deleteInvoice,
	};
};
export default useViewDataList;
