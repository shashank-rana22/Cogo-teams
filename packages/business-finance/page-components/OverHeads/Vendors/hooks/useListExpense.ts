import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Props {
	vendorId?:string | number,
	expenseType?:string,
	pageIndex?:number,
	pageSize?:number,
}

const useListExpense = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/list',
			method  : 'get',
			authKey : 'get_purchase_expense_list',
		},
		{ manual: true },
	);

	const getList = useCallback(async ({ vendorId, expenseType, pageIndex, pageSize }:Props) => {
		try {
			await trigger({
				params: {
					expenseType,
					entityCodeId   : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
					pageSize,
					pageIndex,
					organizationId : vendorId,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [trigger]);

	return {
		getList,
		listData    : data,
		listLoading : loading,
	};
};

export default useListExpense;
