import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const useListTaggedInvoices = () => {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));

	const [params, setParams] = useState({
		pageIndex : 1,
		pageSize  : 10,
	});

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
					payrunId  : payrun,
					pageSize  : 10,
					pageIndex : 1,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Fetch Data');
		}
	}, [payrun, trigger]);

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
