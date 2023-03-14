import { useDebounceQuery } from '@cogoport/forms';
import { useState } from 'react';

const useSearch = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();

	return {
		debounceQuery,
		searchQuery,
		searchValue,
		setSearchValue,
	};
};

export default useSearch;
