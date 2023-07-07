import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Props {
	rowId?: string;
	sort?: object;
	page?: number;
}

const DEFAULT_PAGE_SIZE = 5;

function useListDunningExecution({ sort, rowId, page }:Props) {
	const [sortBy] = Object.keys(sort);
	const [sortType] = Object.values(sort);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/list-dunning-cycle-execution',
			method  : 'get',
			authKey : 'get_payments_dunning_list_dunning_cycle_execution',
		},
		{ manual: true },
	);

	const getDunningExecutions = useCallback(async () => {
		try {
			await trigger({
				params: {
					id        : rowId,
					sortBy,
					sortType,
					pageIndex : page,
					pageSize  : DEFAULT_PAGE_SIZE,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}, [page, rowId, sortBy, sortType, trigger]);

	return {
		data,
		loading,
		getDunningExecutions,
	};
}

export default useListDunningExecution;
