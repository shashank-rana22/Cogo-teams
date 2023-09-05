import React, { useState } from 'react';

import useCreateRDAutomationParameters from '../hooks/useCreateRDAutomationParameters';

import FilterLayout from './FilterLayout';
import TableLayout from './TableLayout';

function AutomationDesk() {
	const [data, setData] = useState({});
	const [filter, setFilter] = useState({ service_type: 'fcl_freight' });
	const { apiTrigger } = useCreateRDAutomationParameters({ setData });

	return (
		<div>
			<FilterLayout filter={filter} setFilter={setFilter} apiTrigger={apiTrigger} />
			<TableLayout data={data} apiTrigger={apiTrigger} filter={filter} />
		</div>
	);
}

export default AutomationDesk;
