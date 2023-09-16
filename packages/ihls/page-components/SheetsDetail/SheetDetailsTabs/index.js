import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import ShipmentRecords from './ShipmentRecords';
import styles from './styles.module.css';
import UniqueLeads from './UniqueLeads';

function SheetDetailsTab() {
	const [activeTab, setActiveTab] = useState('unique_lead');
	return (
		<div className={styles.container}>
			<Tabs activeTab={activeTab} onChange={setActiveTab}>
				<TabPanel name="unique_lead" title="Unique Leads">
					<UniqueLeads />
				</TabPanel>

				<TabPanel name="shipment_records" title="Shipment Records">
					<ShipmentRecords />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default SheetDetailsTab;
