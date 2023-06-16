import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface Props {
	manageExceptionFilter?: { pageIndex?: number };
	cycleListId?: string;
}
const useManageExceptionList = ({ manageExceptionFilter, cycleListId }:Props) => {
	const [searchValue, setSearchValue] = useState('');
	const { pageIndex = 1 } = manageExceptionFilter || {};
	const [{ data:manageExceptionData, loading:manageExceptionLoading }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/cycle-exception',
			method  : 'get',
			authKey : 'get_payments_dunning_cycle_exception',
		},
		{ manual: true },
	);
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue, debounceQuery]);

	const getManageExceptionList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						cycleId : cycleListId || undefined,
						query   : query || undefined,
						pageIndex,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [trigger, cycleListId, query, pageIndex]);

	return {
		manageExceptionData,
		manageExceptionLoading,
		getManageExceptionList,
		searchValue,
		setSearchValue,

	};
};

export default useManageExceptionList;
