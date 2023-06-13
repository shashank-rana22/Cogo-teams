import { useState } from 'react';

import getColumns from './getColumns';

const useChapter = () => {
	const [search, setSearch] = useState('');

	const columns = getColumns();

	return {
		columns,
		search,
		setSearch,
	};
};

export default useChapter;
