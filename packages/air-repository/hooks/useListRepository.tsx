import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListRepository = () => {
	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest('/list_service_ops_repository', { manual: true });

	const listRepository = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						q: (query || '').trim() || undefined,

					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [query, trigger]);

	useEffect(() => {
		debounceQuery(searchValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	useEffect(() => {
		listRepository();
	}, [listRepository, page, query]);

	return {
		data,
		listRepository,
		loading,
		searchValue,
		setSearchValue,
	};
};

export default useListRepository;
