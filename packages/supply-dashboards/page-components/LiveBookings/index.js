import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LiveBookings from './Content';

function LiveBookingsView() {
	const { push } = useRouter();

	const ACTIVE_TAB = 'live_bookings';
	const handleTabChange = (tab) => {
		if (tab !== 'live_bookings') {
			const route = tab.replace('_', '-');
			push(`/supply/dashboards/${route}`);
		}
	};
	return (
		<div>
			<Tabs activeTab={ACTIVE_TAB} onChange={(tab) => { handleTabChange(tab); }}>
				<TabPanel name="live_bookings" title="Live Bookings"><LiveBookings /></TabPanel>
				<TabPanel name="rfq_enquiries" title="RFQ Enquiries">
					--
				</TabPanel>
				<TabPanel name="rate_density" title="Price TaskBoard">
					--
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default LiveBookingsView;
