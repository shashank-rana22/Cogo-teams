import { Tabs, TabPanel } from '@cogoport/components';
import { PARTNER_IDS } from '@cogoport/constants/role_ids';
import { useSelector } from '@cogoport/store';

import RfqEnquiries from './Content';

function RfqEnquiriesView() {
	const partnerId = useSelector((state) => state?.profile?.partner?.id);
	const activeTab = 'rfq_enquiries';
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
				<TabPanel name="live_bookings" title="Live Bookings">--</TabPanel>
				<TabPanel name="trade_enquiry" title="Missing Rates">--</TabPanel>
				<TabPanel name="disliked_rates" title="Disliked Rates">--</TabPanel>
				{partnerId !== PARTNER_IDS.VIETNAM_PARTNER_ID && (
					<TabPanel name="rate_density" title="Rate Density & Coverage">--</TabPanel>)}
				<TabPanel name="manage_forecast" title="Manage Forecast">--</TabPanel>
				<TabPanel name="rfq_enquiries" title="RFQ Enquiries">
					<RfqEnquiries />
				</TabPanel>
				<TabPanel name="rates_sheets" title="Rate Sheets">--</TabPanel>
			</Tabs>
		</div>
	);
}
export default RfqEnquiriesView;
