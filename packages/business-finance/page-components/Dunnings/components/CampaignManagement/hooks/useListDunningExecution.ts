import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

interface Props {
	rowId?: string;
	sort?: object;
}

function useListDunningExecution({ rowId }:Props) {
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
					dunningCycleId: rowId,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}, [rowId, trigger]);

	return {
		data,
		loading,
		getDunningExecutions,
	};
}

export default useListDunningExecution;
