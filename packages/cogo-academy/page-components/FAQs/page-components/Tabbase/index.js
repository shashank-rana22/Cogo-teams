import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';

import Dashboard from './Dashboard';
import MostReadFAQs from './MostReadFAQs';

function Tabbase() {
	const [activeTab, setActiveTab] = useState('All FAQs');

	return (
		<div style={{ margin: 20 }}>
			<Tabs
				tabIcon={<IcMProfile />}
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name="All FAQs" title="All FAQs">
					<Dashboard tabTitle="All FAQs" />
				</TabPanel>

				<TabPanel name="Most Read" title="Most Read">
					<MostReadFAQs />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tabbase;
