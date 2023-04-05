import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import SelectFilter from './SelectedFilter/index';
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
					{/* <div>Pending</div> */}
				</TabPanel>

				<TabPanel name="history" title="History" badge={5}>
					{/* <div>History</div> */}
				</TabPanel>
			</Tabs>
			<div className={styles.sub_container}>
				<SelectFilter />
			</div>
		</div>
	);
}
export default AdvancePayment;
