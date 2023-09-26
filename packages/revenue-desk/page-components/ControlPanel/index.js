import { Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AutomationDesk from './AutomationDesk';
import AutomationWallet from './AutomationWallet';
import styles from './styles.module.css';

function ControlPanel() {
	const router = useRouter();
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const [activeTab, setActiveTab] = useState('automation_desk');

	return (
		<div className={styles.outerContainer}>
			<div
				className={styles.back_button}
				role="presentation"
				onClick={() => router.push(`/${partnerId}/revenue-desk`)}
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
					<AutomationDesk />
				</TabPanel>

				<TabPanel name="automation_wallet" title="Wallet">
					<AutomationWallet />
				</TabPanel>
			</Tabs>

		</div>
	);
}
export default ControlPanel;
