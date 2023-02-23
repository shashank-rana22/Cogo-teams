import { Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';

import Dashboard from '../Dashboard';
import MostReadFAQs from '../MostReadFAQs';
import TrendingFAQs from '../TrendingFAQs';

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
					<Dashboard tabTitle="All FAQs" />
				</TabPanel>
{/* 
				<TabPanel name="Trending" title="Trending" badge={5}>
					<TrendingFAQs />
				</TabPanel> */}

				<TabPanel name="Most Read" title="Most Read" badge={3}>
					<MostReadFAQs />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Tabbase;
