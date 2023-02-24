/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

import { FilterProps, StatusObject } from '../common/interfaces';

const useGetList = ({ status }: StatusObject) => {
	const [filters, setFilters] = useState<FilterProps>({
		pageIndex   : 1,
		pageLimit   : 10,
		status,
		searchQuery : '',
	});

	const { search, ...rest } = filters || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/translation/translate/list',
			method  : 'get',
			authKey : 'get_translation_translate_list',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();
	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	const refetch = () => {
		try {
			trigger({
				params: {
					...filters,
					q           : query || undefined,
					pageIndex   : filters.pageIndex,
					status,
					searchQuery : undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(() => {
		refetch();
	}, [JSON.stringify(rest)]);

	useEffect(() => {
		setFilters({
			...filters,
			status,
			searchQuery : query,
			pageIndex   : 1,
		});
	}, [status, query]);

	return {
		loading,
		data,
		setFilters,
		filters,
		refetch,
	};
};

export default useGetList;
