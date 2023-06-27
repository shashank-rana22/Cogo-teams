import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface GlobalFilters {
	search?: string;
	page?: number;
	cycleStatus?: string;
	dunningCycleType?: string;
	frequency?: string;
}
interface Props {
	globalFilters?: GlobalFilters;
	setGlobalFilters?: Function;
	sort?: object;
}

function useListDunningCycle({ globalFilters, setGlobalFilters, sort }:Props) {
	const { search, page, cycleStatus, dunningCycleType, frequency } = globalFilters || {};
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

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
		setGlobalFilters((prev) => ({ ...prev, page: 1 }));
	}, [search, debounceQuery, setGlobalFilters]);

	const getDunningList = useCallback((async () => {
		try {
			await trigger({
				params: {
					query            : query || undefined,
					cycleStatus      : cycleStatus || undefined,
					dunningCycleType : dunningCycleType || undefined,
					frequency        : frequency || undefined,
					sortBy,
					sortType,
					pageIndex        : page,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}), [cycleStatus, dunningCycleType, page, query, trigger, frequency, sortBy, sortType]);

	useEffect(() => {
		getDunningList();
	}, [query, page, cycleStatus,
		dunningCycleType, getDunningList,
		sortType, sortBy,
	]);

	return {
		data,
		loading,
		getDunningList,
	};
}

export default useListDunningCycle;
