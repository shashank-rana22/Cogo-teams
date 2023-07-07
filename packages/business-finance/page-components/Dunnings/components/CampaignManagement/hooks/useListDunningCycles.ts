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
	setDropdown?: Function;
}

function useListDunningCycles({ globalFilters, setGlobalFilters, sort, setDropdown }:Props) {
	const { search, page, cycleStatus, dunningCycleType, frequency } = globalFilters || {};
	const [sortBy] = Object.keys(sort);
	const [sortType] = Object.values(sort);

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/list-dunning',
			method  : 'get',
			authKey : 'get_payments_dunning_list_dunning',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
		setGlobalFilters((prev) => ({ ...prev, page: 1 }));
	}, [search, debounceQuery, setGlobalFilters]);

	const getDunningCycle = useCallback((async () => {
		try {
			await trigger({
				params: {
					query            : query || undefined,
					pageIndex        : page,
					cycleStatus      : cycleStatus || undefined,
					sortBy,
					sortType,
					dunningCycleType : dunningCycleType || undefined,
					frequency        : frequency || undefined,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}), [cycleStatus, dunningCycleType, page, query, trigger, frequency, sortBy, sortType]);

	useEffect(() => {
		getDunningCycle();
		setDropdown(null);
	}, [query, page, cycleStatus,
		dunningCycleType, getDunningCycle,
		sortType, sortBy, setDropdown,
	]);

	return {
		cycleData    : data,
		cycleLoading : loading,
		getDunningCycle,
	};
}

export default useListDunningCycles;
