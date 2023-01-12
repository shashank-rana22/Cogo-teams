import { Tabs, TabPanel } from '@cogoport/components';
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
				<TabPanel name="live_bookings" title="Live Bookings">--</TabPanel>
				<TabPanel name="rfq_enquiries" title="RFQ Enquiries">
					<RfqEnquiries />
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default RfqEnquiriesView;
