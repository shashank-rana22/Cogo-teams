import { Tabs, TabsPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LiveBookings from '../page-components/LiveBookings';

function LiveBookingsView() {
	const { push } = useRouter();

	const activeTab = 'live_bookings';
	const handleTabChange = (tab) => {
		if (tab !== 'live_bookings') {
			const route = tab.replace('_', '-');
			push(`/supply/dashboards/${route}`);
		}
	};
	return (
		<div>
			<Tabs activeTab={activeTab} onChange={(tab) => { handleTabChange(tab); }}>
				<TabsPanel name="live_bookings" title="Live Bookings"><LiveBookings /></TabsPanel>
				<TabsPanel name="rfq_enquiries" title="RFQ Enquiries">
					--
				</TabsPanel>
			</Tabs>
		</div>
	);
}
export default LiveBookingsView;
