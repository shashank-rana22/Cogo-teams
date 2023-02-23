import { TabPanel, Tabs } from '@cogoport/components';

function PrimaryTabs({ activeTab = '', setActiveTab = () => {} }) {
	return (
		<div style={{ marginTop: 30 }}>
			<Tabs
				activeTab={activeTab}
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="enrichment_requests" title="Enrichment Requests" />

				<TabPanel name="requests_sent" title="Requests Sent" />
			</Tabs>
		</div>
	);
}

export default PrimaryTabs;
