import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useMasterException = ({ exceptionFilter }) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const { category = '', creditDays = 0 } = exceptionFilter || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/dunning/master-exceptions',
			method  : 'get',
			authKey : 'get_payments_dunning_master_exceptions',
		},
		{ manual: true },
	);
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchValue);
	}, [searchValue, debounceQuery]);

	const getMasterList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						segmentation : category || undefined,
						creditDays   : creditDays ? parseInt(creditDays, 10) : undefined,
						query        : query || undefined,
					},
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, [category, creditDays, query, trigger]);

	useEffect(() => {
		getMasterList();
	}, [getMasterList]);
	return {
		data,
		loading,
		getMasterList,
		searchValue,
		setSearchValue,

	};
};

export default useMasterException;
