import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useListDunningCycles({ globalFilters, setGlobalFilters, sort, setDropdown }) {
	const { search, page, dunningCycleType, frequency } = globalFilters || {};
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
		setGlobalFilters((prev) => ({ ...prev, page: 1 })); // reset page to 1 on search
	}, [search, debounceQuery, setGlobalFilters]);

	const getDunningCycle = useCallback((() => {
		try {
			trigger({
				params: {
					query            : query || undefined,
					pageIndex        : page,
					sortBy,
					sortType,
					dunningCycleType : dunningCycleType || undefined,
					frequency        : frequency || undefined,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}), [dunningCycleType, page, query, trigger, frequency, sortBy, sortType]);

	useEffect(() => {
		getDunningCycle();
		setDropdown(null); // closing opened dropdown on list refetch
	}, [query, page,
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
