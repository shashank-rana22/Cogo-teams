import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

// eslint-disable-next-line import/no-cycle
import LiveBookingsView from '../LiveBookings';
import RfqEnquiries from '../RfqEnquiries/Content';

import RateCoverageContent from './Content';

function RateCoverage() {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const ACTIVETAB = 'rate_density';
	const { push } = useRouter();

	const handleTabChange = (tab) => {
		if (tab !== 'rate_density') {
			const route = tab.replace('_', '-');
			if (route === 'rfq-enquiries') {
				push(`/supply/dashboards/${route}`);
			} else {
				window.location.href = `/${partnerId}/supply/dashboards/${route}`;
			}
		}
	};

	return (
		<div>
			<Tabs fullWidth activeTab={ACTIVETAB} themeType="primary" onChange={(tab) => { handleTabChange(tab); }}>
				<TabPanel name="live_bookings" title="Live Bookings"><LiveBookingsView /></TabPanel>
				<TabPanel name="trade_enquiry" title="Missing Rates">--</TabPanel>
				<TabPanel name="disliked_rates" title="Disliked Rates">--</TabPanel>
				<TabPanel name="rate_density" title="Rate Coverage"><RateCoverageContent /></TabPanel>
				<TabPanel name="manage_forecast" title="Manage Forcast">--</TabPanel>
				<TabPanel name="rfq_enquiries" title="RFQ Enquiries">
					<RfqEnquiries />
				</TabPanel>
				<TabPanel name="rates_sheets" title="Rate Sheets">--</TabPanel>
			</Tabs>
		</div>
	);
}
export default RateCoverage;
