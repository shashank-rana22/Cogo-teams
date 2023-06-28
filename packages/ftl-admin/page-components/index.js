import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import EditInvoice from './EditInvoice';
import ReopenTasks from './ReopenTasks';
import SIDBeforeDeparture from './SIDBeforeDeparture';

const TAB_CONFIG = {
	SID_BEFIRE_DEPARTURE : 'SID Before Departure',
	EDIT_INVOICE         : 'Edit Invoice',
	REOPEN_TASK          : 'Reopen Tasks',
};

function FTL_EDIT_SHIPMENT() {
	const [activeTab, setActiveTab] = useState(TAB_CONFIG.SID_BEFIRE_DEPARTURE);

	return (
		<div style={{ margin: '0 20px 20px' }}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name={TAB_CONFIG.SID_BEFIRE_DEPARTURE} title={TAB_CONFIG.SID_BEFIRE_DEPARTURE}>
					<SIDBeforeDeparture />
				</TabPanel>
				<TabPanel name={TAB_CONFIG.EDIT_INVOICE} title={TAB_CONFIG.EDIT_INVOICE}>
					<EditInvoice />
				</TabPanel>
				<TabPanel name={TAB_CONFIG.REOPEN_TASK} title={TAB_CONFIG.REOPEN_TASK}>
					<ReopenTasks />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default FTL_EDIT_SHIPMENT;
