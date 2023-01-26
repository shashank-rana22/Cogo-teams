/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';

const useSearchQuery = () => {
	const [query, setQuery] = useState('');
	let timeoutId: NodeJS.Timeout;

	function debounce(callback: () => void, delay: number) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(callback, delay);
	}

	const debounceQuery = useCallback((value) => debounce(() => {
		setQuery(value);
	}, 600), []);

	return { debounceQuery, query };
};

export default useSearchQuery;
