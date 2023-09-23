import { Tabs, TabPanel } from '@cogoport/components';

const TAB_MAPPING = [
	{ name: 'pending_approval', title: 'Applied Services' },
	{ name: 'more_info_required', title: 'More Info Requested' },
	{ name: 'cooling_period', title: 'Cooling Down' },
	{ name: 'active', title: 'Approved' },
	{ name: 'inactive', title: 'Rejected' },
];
function TabsComponent({ activeTab = '', setActive = () => {} }) {
	return (
		<Tabs activeTab={activeTab} themeType="primary" onChange={setActive}>
			{TAB_MAPPING.map((tab) => (<TabPanel name={tab?.name} title={tab?.title} key={tab?.name} />))}
		</Tabs>
	);
}
export default TabsComponent;
