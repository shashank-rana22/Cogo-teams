import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListGetSelectedPayrun = ({ payload = {}, viewSelectedInvoice = false, setApiData = () => {} }) => {
	const [{ data, loading }, trigger] =	useRequestBf(
		{
			url: '/purchase/payrun-bill', method: 'get', authKey: 'get_purchase_payrun_bill',
		},
		{ manual: true },
	);

	const parserdData = JSON.stringify(payload);

	const refetch = useCallback(() => {
		trigger({
			params: {
				...(JSON.parse(parserdData) || {}),
			},
		});
	}, [parserdData, trigger]);

	useEffect(() => {
		if (viewSelectedInvoice) { refetch(); }
	}, [refetch, viewSelectedInvoice]);

	useEffect(() => {
		const newData = { ...data };
		if (newData.list) {
			newData.list = newData?.list?.map((item) => ({
				...item,
				payableValue       : item?.payableAmount,
				tdsValue           : item?.tdsAmount,
				inputAmount        : item?.payableAmount,
				constPayableAmount : item?.invoiceAmount,
			}));
		}
		setApiData(newData);
	}, [data, setApiData]);

	return {
		selectedListRefetch : refetch,
		selectedListLoading : loading,
		selectedListData    : data,
	};
};

export default useListGetSelectedPayrun;
