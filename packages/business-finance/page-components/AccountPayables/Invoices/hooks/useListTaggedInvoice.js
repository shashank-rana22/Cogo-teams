import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError';

const useListTaggedInvoices = () => {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));

	const [params, setParams] = useState({
		pageIndex : 1,
		pageSize  : 10,
	});

	const { pageSize = 10, pageIndex = 1 } = params || {};

	const { payrun = '' } = query || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: true },
	);

	const generateInvoice = useCallback(async () => {
		try {
			trigger({
				params: {
					payrunId: payrun,
					pageSize,
					pageIndex,
				},
			});
		} catch (e) {
			toastApiError(e || 'Failed to Fetch Data');
		}
	}, [payrun, trigger, pageSize, pageIndex]);

	useEffect(() => {
		generateInvoice();
	}, [generateInvoice]);

	return {
		data,
		loadingList: loading,
		generateInvoice,
		setParams,
		params,
	};
};

export default useListTaggedInvoices;
