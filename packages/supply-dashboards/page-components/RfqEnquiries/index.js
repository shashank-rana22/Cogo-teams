import { Tabs, TabPanel } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

import TabPanelMapping from './configurations/tab-panel-mapping';

function RfqEnquiriesView() {
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const activeTab = 'rfq_enquiries';

	const geo = getGeoConstants();

	const { navigations } = geo || {};

	const { supply_dashboard } = navigations || {};

	const { tabs = [] } = supply_dashboard.rfq_enquiries || {};

	const handleTabChange = (tab) => {
		if (tab !== 'rfq_enquiries') {
			const route = tab.replace('_', '-');
			// eslint-disable-next-line no-undef
			window.location.href = `/${partnerId}/supply/dashboards/${route}`;
		}
	};

	return (
		<div>
			<Tabs fullWidth activeTab={activeTab} onChange={(tab) => { handleTabChange(tab); }}>
				{(TabPanelMapping || []).map(({
					name, title,
					component,
				}) => tabs.includes(name)
							&& <TabPanel key={title} name={name} title={title}>{component}</TabPanel>)}
			</Tabs>
		</div>
	);
}
export default RfqEnquiriesView;
