import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import { TAB_CONFIG } from '../utils/tabConfig';

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
