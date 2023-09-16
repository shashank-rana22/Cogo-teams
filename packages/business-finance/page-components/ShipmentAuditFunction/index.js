import { TabPanel, Tabs, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

function ShipmentAuditFunction() {
	const { push } = useRouter();
	const [activeTab, setActiveTab] = useState('dashboard');

	const handleClick = () => {
		push(
			'/business-finance/shipment-audit-function/next-page',
			'/business-finance/shipment-audit-function/next-page',
		);
	};

	return (
		<main>
			<div className={styles.main_heading}>Shipment Audit Function</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					onChange={setActiveTab}
					themeType="primary"
				>
					<TabPanel
						className={styles.tab_panel_dashboard}
						name="dashboard"
						title="Dashboard"
					>

						<Button onClick={handleClick}>Go to Next Page</Button>

					</TabPanel>

					<TabPanel name="configuration" title="Configuration">
						Config
					</TabPanel>
				</Tabs>
			</div>

		</main>
	);
}

export default ShipmentAuditFunction;
