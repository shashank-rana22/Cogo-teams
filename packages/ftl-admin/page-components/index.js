import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import EditInvoice from './EditInvoice';
import EditSellQuotation from './EditSellQuotation';
import ReAllocation from './ReAllocation';
import ReopenTasks from './ReopenTasks';
import SIDBeforeDeparture from './SIDBeforeDeparture';

const TAB_CONFIG = {
	SID_BEFORE_DEPARTURE: {
		key       : 'SID_BEFORE_DEPARTURE',
		title     : 'SID Before Departure',
		component : (val) => <SIDBeforeDeparture {...val} />,
	},
	EDIT_INVOICE: {
		key       : 'EDIT_INVOICE',
		title     : 'Edit Invoice',
		component : (val) => <EditInvoice {...val} />,
	},
	REOPEN_TASK: {
		key       : 'REOPEN_TASK',
		title     : 'Reopen Tasks',
		component : (val) => <ReopenTasks {...val} />,
	},
	EDIT_SELL_QUOTATION: {
		key       : 'EDIT_SELL_QUOTATION',
		title     : 'Edit Sell Quotaion',
		component : (val) => <EditSellQuotation {...val} />,
	},
	STAKEHOLDER_RE_ALLOCATION: {
		key       : 'STAKEHOLDER_RE_ALLOCATION',
		title     : 'Reallocate Stakeholders',
		component : (val) => <ReAllocation {...val} />,
	},
};

function FtlEditShipment() {
	const [activeTab, setActiveTab] = useState(TAB_CONFIG.SID_BEFORE_DEPARTURE.key);

	return (
		<div style={{ margin: '0 20px 20px' }}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{Object.values(TAB_CONFIG).map((config) => (
					<TabPanel name={config.key} key={config.key} title={config.title}>
						{config.component({ activeTab })}
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default FtlEditShipment;
