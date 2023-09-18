import { Tabs, TabPanel } from '@cogoport/components';

function TabsComponent({ activeTab = '', setActive = () => {} }) {
	return (
		<Tabs activeTab={activeTab} themeType="primary" onChange={setActive}>
			<TabPanel name="pending_approval" title="Applied Services" />
			<TabPanel name="more_info_required" title="More Info Requested" />
			<TabPanel name="cooling_period" title="Cooling Down" />
			<TabPanel name="active" title="Approved" />
			<TabPanel name="inactive" title="Rejected" />
		</Tabs>
	);
}
export default TabsComponent;
