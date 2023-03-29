import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useSalary = () => {
	const [
		{ data:salaryData, loading:salaryLoading },
		salaryTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/segments',
			method  : 'get',
			authKey : 'get_pnl_statement_segments',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await salaryTrigger({
				params: {
					sourceFile: 'be',
				},
			});
		} catch (error) {
			console.log(error, 'error');
		}
	}, [salaryTrigger]);
	return {
		refetch,
		salaryData,
		salaryLoading,
	};
};
export default useSalary;
