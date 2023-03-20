import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';
import { useContext } from 'react';
import Documents from './Documents';
import Emails from './Emails';
import PurchaseInvoice from './Invoicing/PurchaseInvoice';
import SalesInvoice from './Invoicing/SalesInvoice';
import Overview from './Overview';
import TimelineAndTask from './TimelineAndTasks';
import Tracking from './Tracking';
import { ShipmentDetailContext } from '@cogoport/context';

function Tab() {
	const [activeTab, setActiveTab] = useState('overview');

	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div style={{ marginTop: 20 }}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="overview" title="Overview">
					<Overview shipment_data={shipment_data}/>
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
					<Emails />
				</TabPanel>
				<TabPanel name="tracking" title="Tracking">
					<Tracking shipment_data={shipment_data}/>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tab;
