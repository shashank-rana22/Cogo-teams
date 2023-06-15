import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useManageExceptionList = ({ manageExceptionFilter }) => {
	const [searchValue, setSearchValue] = useState<string>('');

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
						cycleId : 'be',
						query   : query || undefined,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [trigger, query]);

	useEffect(() => {
		getManageExceptionList();
	}, [getManageExceptionList]);
	return {
		manageExceptionData,
		manageExceptionLoading,
		getManageExceptionList,
		searchValue,
		setSearchValue,

	};
};

export default useManageExceptionList;
