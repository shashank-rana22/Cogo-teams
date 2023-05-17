import { Tabs, TabPanel } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useSelector } from '@cogoport/store';

import TabPanelMapping from './configurations/tab-panel-mapping';

function RfqEnquiriesView() {
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const activeTab = 'rfq_enquiries';

	const geo = getGeoConstants();

	const { entity_specific_data } = geo || {};

	const { feature_supported } = entity_specific_data || {};

	const { tabs_not_supported = []	} = feature_supported.supply_dashboard || {};

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
				}) => !tabs_not_supported.includes(name)
							&& <TabPanel key={title} name={name} title={title}>{component}</TabPanel>)}
			</Tabs>
		</div>
	);
}
export default RfqEnquiriesView;
