import { debounce } from '@cogoport/utils';
import { useCallback, useState } from 'react';

const useSearchQuery = () => {
	const [query, setQuery] = useState('');

	const debounceQuery = useCallback((value: string) => debounce(() => {
		setQuery(value);
	}, 600), []);

	return { debounceQuery, query };
};

export default useSearchQuery;
