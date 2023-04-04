import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function AdvancePayment() {
	const [activeTab, setActiveTab] = useState('pending');
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="tertiary"
				onChange={setActiveTab}
			>
				<TabPanel name="pending" title="Pending" badge={3}>
					<div>This is local search</div>
				</TabPanel>

				<TabPanel name="history" title="History" badge={5}>
					<div>This is suggested</div>
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default AdvancePayment;
