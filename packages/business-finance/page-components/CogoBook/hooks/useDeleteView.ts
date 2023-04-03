import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

const useDeleteView = () => {
	const { query, push } = useRouter();
	const [
		{ loading:deleteLoading },
		salaryTrigger,
	] = useRequestBf(
		{
			url     : '/pnl/statement/source-file',
			method  : 'delete',
			authKey : 'delete_pnl_statement_salary',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			const res = await salaryTrigger({
				params: {
					sourceFileId: query?.sourceFileId,
				},
			});
			if (res.data) {
				push(
					'/business-finance/cogo-book/pl_statement',
					'/business-finance/cogo-book/pl_statement',
				);
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	}, [push, query?.sourceFileId, salaryTrigger]);
	return {
		refetch,
		deleteLoading,
	};
};
export default useDeleteView;
