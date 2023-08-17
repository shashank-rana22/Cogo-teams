import { useState } from 'react';

import FilterLayout from './FilterLayout';
import useCreateRDAutomationParameters from './hooks/useCreateRDAutomationParameters';
import styles from './styles.module.css';
import TableLayout from './TableLayout';

function ControlPanel() {
	const [data, setData] = useState({});
	const [filter, setFilter] = useState({ service_type: 'fcl_freight' });
	const { apiTrigger } = useCreateRDAutomationParameters({ setData });
	return (
		<div className={styles.outerContainer}>
			<div className={styles.headTitle}>Automation Desk</div>
			<FilterLayout apiTrigger={apiTrigger} filter={filter} setFilter={setFilter} />
			<TableLayout data={data} apiTrigger={apiTrigger} filter={filter} />
		</div>
	);
}
export default ControlPanel;
