import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Accounts from './components/Accounts';
import Logs from './components/Logs';
import styles from './styles.module.css';

const LEAD_ENRICHMENT_TABS = {
	accounts: {
		name      : 'accounts',
		title     : 'Accounts',
		Component : Accounts,
	},
	logs: {
		name      : 'logs',
		title     : 'Logs',
		Component : Logs,
	},
};

function LeadEnrichment() {
	const [activeTab, setActiveTab] = useState('accounts');

	return (
		<>
			<div className={styles.header}>Cogo Leads</div>
			<div className={styles.description}>Click on pie chart to filter</div>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				className={styles.tab}
			>
				{Object.values(LEAD_ENRICHMENT_TABS).map((item) => {
					const { name = '', title = '', Component } = item;

					if (!Component) return null;

					return (
						<TabPanel
							key={name}
							name={name}
							title={title}
						>
							<Component />
						</TabPanel>
					);
				})}
			</Tabs>
		</>
	);
}

export default LeadEnrichment;
