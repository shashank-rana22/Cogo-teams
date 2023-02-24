import { TabPanel, Tabs } from '@cogoport/components';

import CardDetails from '../../common/CardDetails';

function PrimaryTabs({ activeTab = '', setActiveTab = () => {} }) {
	return (
		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="user" title="Point Of Contacts">

					<CardDetails type="user" />
				</TabPanel>

				<TabPanel name="address" title="Address">

					<CardDetails type="address" />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
