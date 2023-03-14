import { debounce } from '@cogoport/front/utils';
import { useCallback, useState } from 'react';

const useSearchQuery = () => {
	// eslint-disable-next-line no-use-before-define
	const [query, setQuery] = useState();
	const request = debounce((value) => {
		setQuery(value);
	}, 600);
	const debounceQuery = useCallback((value) => request(value), [request]);
	return { debounceQuery, query };
};

export default useSearchQuery;
