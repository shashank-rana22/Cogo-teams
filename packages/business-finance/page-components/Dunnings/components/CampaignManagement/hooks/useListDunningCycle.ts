import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

function useListDunningCycle({ globalFilters, setGlobalFilters }) {
	const { search, page, service, cycleStatus, dunningCycleType } = globalFilters || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/list-dunning-cycle-execution',
			method  : 'get',
			authKey : 'get__payments_dunning_list_dunning_cycle_execution',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
		setGlobalFilters((prev) => ({ ...prev, page: 1 }));
	}, [search, debounceQuery, setGlobalFilters]);

	const getDunningList = async () => {
		try {
			 await trigger({
				params: {
				 		query            : query || undefined,
					cycleStatus      : cycleStatus || undefined,
					dunningCycleType : dunningCycleType || undefined,
					service          : service || undefined,
					pageIndex        : page,
				},
			 });
		} catch (err) {
			console.log('err-', err);
		}
	};

	useEffect(() => {
		getDunningList();
	}, [query, page, service, cycleStatus,
		 dunningCycleType]);

	return {
		data,
		loading,
		getDunningList,
	};
}

export default useListDunningCycle;
