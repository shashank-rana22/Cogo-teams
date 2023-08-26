import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import FilterLayout from './FilterLayout';
import useCreateRDAutomationParameters from './hooks/useCreateRDAutomationParameters';
import styles from './styles.module.css';
import TableLayout from './TableLayout';

function ControlPanel() {
	const router = useRouter();
	const [data, setData] = useState({});
	const [filter, setFilter] = useState({ service_type: 'fcl_freight' });
	const { apiTrigger } = useCreateRDAutomationParameters({ setData });
	return (
		<div className={styles.outerContainer}>
			<div
				className={styles.back_button}
				role="presentation"
				onClick={() => router.push('/revenue-desk')}
			>
				<IcMArrowBack style={{ width: '1.5em', height: '1.5em' }} />
				<div className={styles.headTitle}>Automation Desk</div>
			</div>
			<FilterLayout apiTrigger={apiTrigger} filter={filter} setFilter={setFilter} />
			{data ? <TableLayout data={data} apiTrigger={apiTrigger} filter={filter} /> : null}

		</div>
	);
}
export default ControlPanel;
