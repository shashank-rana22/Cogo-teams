import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import Header from '../Header';
import Documents from '../Tabs/Documents';
import PurchaseInvoice from '../Tabs/Invoicing/PurchaseInvoice';
import SalesInvoice from '../Tabs/Invoicing/SalesInvoice';
import Overview from '../Tabs/Overview';
import TimelineAndTask from '../Tabs/TimelineAndTasks';
import Tracking from '../Tabs/Tracking';
import Timeline from '../TimeLine';

function ShipmentDetails() {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div>
			<Header />
			<Timeline />
			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="overview" title="Overview">
						<Overview />
					</TabPanel>
					<TabPanel name="invoice" title="Timeline and Tasks">
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
					<TabPanel name="tracking" title="Tracking">
						<Tracking />
					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}

export default ShipmentDetails;
