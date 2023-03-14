import React, { useState } from 'react';
import { TabPanel, Tabs } from '@cogoport/components';

import Documents from './Documents';
import PurchaseInvoice from './Invoicing/PurchaseInvoice';
import SalesInvoice from './Invoicing/SalesInvoice';
import Overview from './Overview';
import TimelineAndTask from './TimelineAndTasks';
import Tracking from './Tracking';

function Tab() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
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
    );
}

export default Tab;
