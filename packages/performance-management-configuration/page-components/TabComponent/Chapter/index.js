import { useState } from 'react';

import Header from '../../../commons/CommonHeader';

function Chapter() {
	const [search, setSearch] = useState('');
	return (
		<div>
			<Header setSearch={setSearch} search={search} label="Chapter" />
		</div>
	);
}

export default Chapter;
