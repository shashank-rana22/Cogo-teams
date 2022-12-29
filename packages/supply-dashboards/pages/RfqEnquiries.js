import { Tabs, TabsPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import RfqEnquiries from '../page-components/RfqEnquiries';

function RfqEnquiriesView() {
	const { push } = useRouter();

	const activeTab = 'rfq_enquiries';
	const handleTabChange = (tab) => {
		if (tab !== 'rfq_enquiries') {
			const route = tab.replace('_', '-');
			push(`/supply/dashboards/${route}`);
		}
	};
	return (
		<div>
			<Tabs activeTab={activeTab} onChange={(tab) => { handleTabChange(tab); }}>
				<TabsPanel name="live_bookings" title="Live Bookings">--</TabsPanel>
				<TabsPanel name="rfq_enquiries" title="RFQ Enquiries">
					<RfqEnquiries />
				</TabsPanel>
			</Tabs>
		</div>
	);
}
export default RfqEnquiriesView;
