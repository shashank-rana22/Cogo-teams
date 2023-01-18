import { Tabs, TabPanel } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import RfqEnquiries from './Content';

function RfqEnquiriesView() {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const activeTab = 'rfq_enquiries';
	const handleTabChange = (tab) => {
		if (tab !== 'rfq_enquiries') {
			const route = tab.replace('_', '-');
			window.location.href = `/${partnerId}/supply/dashboards/${route}`;
		}
	};

	return (
		<div>
			<Tabs fullWidth activeTab={activeTab} onChange={(tab) => { handleTabChange(tab); }}>
				<TabPanel name="live_bookings" title="Live Bookings">--</TabPanel>
				<TabPanel name="missing_rates" title="Missing Rates">--</TabPanel>
				<TabPanel name="dislike_rates" title="Disliked Rates">--</TabPanel>
				<TabPanel name="rate_density" title="Rate Density & Coverage">--</TabPanel>
				<TabPanel name="manage_forecast" title="Manage Forcast">--</TabPanel>
				<TabPanel name="rfq_enquiries" title="RFQ Enquiries">
					<RfqEnquiries />
				</TabPanel>
				<TabPanel name="rate_sheets" title="Rate Sheets">--</TabPanel>
			</Tabs>
		</div>
	);
}
export default RfqEnquiriesView;
