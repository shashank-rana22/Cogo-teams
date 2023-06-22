import React, { useState } from 'react';

import Header from '../Header';
import TableView from '../TableView';

function ChroDashboard() {
	const [search, setSearch] = useState('');
	const [activeTab, setActiveTab] = useState('active');

	return (
		<div>
			<Header search={search} setSearch={setSearch} activeTab={activeTab} setActiveTab={setActiveTab} />
			<TableView search={search} activeTab={activeTab} />
		</div>
	);
}

export default ChroDashboard;
