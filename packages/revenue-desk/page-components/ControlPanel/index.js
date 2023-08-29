import { Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AutomationWallet from './AutomationWallet';
import FilterLayout from './FilterLayout';
import useCreateRDAutomationParameters from './hooks/useCreateRDAutomationParameters';
import styles from './styles.module.css';
import TableLayout from './TableLayout';

function ControlPanel() {
	const router = useRouter();
	const [data, setData] = useState({});
	const [activeTab, setActiveTab] = useState('automation_desk');
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
				<div className={styles.headTitle}>Go Back</div>
			</div>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name="automation_desk" title="Automation Desk">
					<FilterLayout apiTrigger={apiTrigger} filter={filter} setFilter={setFilter} />
					{data ? <TableLayout data={data} apiTrigger={apiTrigger} filter={filter} /> : null}
				</TabPanel>

				<TabPanel name="automation_wallet" title="Automation Wallet">
					<AutomationWallet />
				</TabPanel>
			</Tabs>

		</div>
	);
}
export default ControlPanel;
