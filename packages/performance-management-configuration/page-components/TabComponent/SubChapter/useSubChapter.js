import { useState } from 'react';

import getColumns from './getColumns';

const useSubChapter = () => {
	const [search, setSearch] = useState('');
	const columns = getColumns();

	return {
		columns,
		search,
		setSearch,
	};
};

export default useSubChapter;
