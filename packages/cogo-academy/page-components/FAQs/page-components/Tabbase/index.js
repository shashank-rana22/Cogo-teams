import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';

// eslint-disable-next-line import/no-cycle
import Dashboard from '../Dashboard';

function Tabbase() {
	const [activeTab, setActiveTab] = useState('Recently Added');
	return (

		<div style={{ margin: 20 }}>
			<Tabs
				tabIcon={<IcMProfile />}
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={setActiveTab}
			>
				<TabPanel name="Recently Added" title="Recently Added" badge={3}>
					<div><Dashboard Tabtitle="Recently Added" /></div>
				</TabPanel>

				<TabPanel name="Trending" title="Trending" badge={5}>
					<div><Dashboard Tabtitle="Trending" /></div>
				</TabPanel>
				<TabPanel name="Most Read" title="Most Read" badge={3}>
					<div><Dashboard Tabtitle="Most Read" /></div>
				</TabPanel>

				<TabPanel name="All FAQs" title="All FAQs" badge={5}>
					<div><Dashboard Tabtitle="All FAQs" /></div>
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tabbase;
