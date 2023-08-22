import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import SHIPMENTS_MAPPING from '../../../../configs/DEMURRAGE_SHIPMENT_MAPPING.json';

function ShipmentTabs({ activeTab = 'active', setActiveTab = () => {} }) {
	const tabs = useMemo(() => (SHIPMENTS_MAPPING.shipment_tabs || []).map((tab) => ({
		title : startCase(tab),
		name  : tab,
	})), []);

	return (
		<Tabs activeTab={activeTab} onChange={setActiveTab} themeType="primary" fullWidth>
			{tabs.map((({ title, name }) => (
				<TabPanel key={name} name={name} title={title} />
			)))}
		</Tabs>
	);
}

export default ShipmentTabs;
