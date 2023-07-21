import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

function useListDunningExecution({ rowId }) {
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

	const getDunningExecutions = useCallback(() => {
		try {
			trigger({
				params: {
					dunningCycleId: rowId,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [rowId, trigger]);

	return {
		data,
		loading,
		getDunningExecutions,
	};
}

export default useListDunningExecution;
