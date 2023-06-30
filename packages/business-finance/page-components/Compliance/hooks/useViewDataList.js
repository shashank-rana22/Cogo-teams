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

	useEffect(() => {
		refetch();
	}, [refetch]);

	useEffect(() => {
		setPage();
	}, []);

	return {
		data,
		page,
		setPage,
		loading,
	};
};
export default useViewDataList;
