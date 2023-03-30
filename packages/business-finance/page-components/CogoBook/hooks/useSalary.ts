import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useSalary = () => {
	const { query } = useRouter();
	const [
		{ data, loading:salaryLoading },
		salaryTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/salary',
			method  : 'get',
			authKey : 'get_pnl_statement_salary',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await salaryTrigger({
				params: {
					sourceFile: query?.id,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [query?.id, salaryTrigger]);
	return {
		refetch,
		salaryData: data?.data,
		salaryLoading,
	};
};
export default useSalary;
