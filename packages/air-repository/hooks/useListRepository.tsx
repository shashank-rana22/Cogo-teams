import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListRepository = () => {
	const [searchValue, setSearchValue] = useState('');
	const [page, setPage] = useState(1);
	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest('/list_shipment_service_ops_repository', { manual: true });

	const listRepository = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							q: (query || '').trim() || undefined,
						},
						page,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [page, query, trigger]);

	useEffect(() => {
		debounceQuery(searchValue);
	}, [debounceQuery, searchValue]);

	useEffect(() => {
		listRepository();
	}, [listRepository, page, query]);

	return {
		data,
		listRepository,
		loading,
		searchValue,
		setSearchValue,
		page,
		setPage,
	};
};

export default useListRepository;
