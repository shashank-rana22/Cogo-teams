import { useState } from 'react';

import Header from '../../../commons/CommonHeader';

function SubChapter() {
	const [search, setSearch] = useState('');
	return (
		<div>
			<Header setSearch={setSearch} search={search} label="Sub Chapter" />
		</div>
	);
}

export default SubChapter;
