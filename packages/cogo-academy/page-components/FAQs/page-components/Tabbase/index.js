import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';
import AllFAQs from '../AllFAQs';

// eslint-disable-next-line import/no-cycle
import Dashboard from '../Dashboard';

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
				<TabPanel name="All FAQs" title="All FAQs" badge={5}>
					<div><AllFAQs /></div>
				</TabPanel>

				<TabPanel name="Trending" title="Trending" badge={5}>
					<div><Dashboard Tabtitle="Trending" /></div>
				</TabPanel>
				<TabPanel name="Most Read" title="Most Read" badge={3}>
					<div><Dashboard Tabtitle="Most Read" /></div>
				</TabPanel>

				
			</Tabs>
		</div>
	);
}

export default Tabbase;
