import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useSelectMonth = () => {
	const [
		{ data, loading:MonthLoading },
		MonthTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/locked-periods',
			method  : 'get',
			authKey : 'get_pnl_statement_locked_periods',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await MonthTrigger({});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [MonthTrigger]);
	return {
		refetch,
		monthData: data?.list,
		MonthLoading,
	};
};
export default useSelectMonth;
