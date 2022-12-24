import { debounce } from '@cogoport/utils';
import { useCallback, useState } from 'react';

const useDebounceQuery = () => {
	const [query, setQuery] = useState('');

	const request = debounce((value: string) => {
		setQuery(value);
	}, 600);

	const debounceQuery = useCallback((value: string) => request(value), [request]);

	return { debounceQuery, query };
};

export default useDebounceQuery;
