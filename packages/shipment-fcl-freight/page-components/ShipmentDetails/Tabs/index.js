import { TabPanel, Tabs } from '@cogoport/components';
import { ShipmentMails } from '@cogoport/shipment-mails';
import React, { useState } from 'react';

import Documents from './Documents';
import PurchaseInvoice from './Invoicing/PurchaseInvoice';
import SalesInvoice from './Invoicing/SalesInvoice';
import Overview from './Overview';
import TimelineAndTask from './TimelineAndTasks';
import Tracking from './Tracking';

function Tab({ shipment_data = {} }) {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div style={{ marginTop: 20 }}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="overview" title="Overview">
					<Overview />
				</TabPanel>
				<TabPanel name="timeline_and_tasks" title="Timeline and Tasks">
					<TimelineAndTask />
				</TabPanel>
				<TabPanel name="sales_live_invoice" title="Sales Live Invoice">
					<SalesInvoice />
				</TabPanel>
				<TabPanel name="purchase_live_invoice" title="Purchase Live Invoice">
					<PurchaseInvoice />
				</TabPanel>
				<TabPanel name="documents" title="Documents">
					<Documents />
				</TabPanel>
				<TabPanel name="emails" title="Emails">
					<ShipmentMails
						source="cogo_rpa"
						filters={{ q: shipment_data.serial_id }}
						pre_subject_text={`${shipment_data.serial_id}`}
					/>
				</TabPanel>
				<TabPanel name="tracking" title="Tracking">
					<Tracking />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tab;
