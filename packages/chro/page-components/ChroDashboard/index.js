import React, { useState } from 'react';

import Header from '../Header';
import TableView from '../TableView';

function ChroDashboard() {
	const [search, setSearch] = useState('');

	return (
		<div>
			<Header search={search} setSearch={setSearch} />
			<TableView search={search} />
		</div>
	);
}

export default ChroDashboard;
