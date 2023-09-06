import { Tabs, TabPanel } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

import { tabPanelMappings } from './configurations/tab-panel-mappings';

function RateCoverage() {
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const ACTIVE_TAB = 'rate_density';

	const geo = getGeoConstants();
	const { navigations = {} } = geo;
	const { supply_dashboard = {} } = navigations;
	const { rfq_enquiries = {} } = supply_dashboard;
	const { tabs = [] } = rfq_enquiries;
	const handleTabChange = (tab) => {
		if (tab !== 'rate_density') {
			const route = tab.replace('_', '-');
			window.location.href = `/${partnerId}/supply/dashboards/${route}`;
		}
	};

	return (
		<div>
			<Tabs fullWidth activeTab={ACTIVE_TAB} themeType="primary" onChange={(tab) => { handleTabChange(tab); }}>
				{(tabPanelMappings || []).map(({ name, title, component }) => {
					if (tabs.includes(name)) {
						return <TabPanel key={name} name={name} title={title}>{component}</TabPanel>;
					}
					return null;
				})}
			</Tabs>
		</div>
	);
}
export default RateCoverage;
