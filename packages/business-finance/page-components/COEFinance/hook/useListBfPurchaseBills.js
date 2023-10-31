import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const getBillsMapping = (billsList) => {
	const billsMap = billsList.reduce((result, bill) => (
		{ ...result, [bill?.billNumber]: bill?.billDocumentUrl }), {});
	return billsMap;
};

const useListBfPurchaseBills = ({ jobNumbers = [] }) => {
	const [{ loading = false, data = {} }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/bill-list-by-job-number',
			method  : 'POST',
			authKey : 'post_purchase_bills_list',
		},
	);

	const listApi = useCallback(async () => {
		try {
			await trigger({
				data: {
					jobNumbers,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(jobNumbers), trigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return {
		billsMap     : getBillsMapping(data?.list || []),
		billsLoading : loading,
		refetch      : listApi,
	};
};

export default useListBfPurchaseBills;
