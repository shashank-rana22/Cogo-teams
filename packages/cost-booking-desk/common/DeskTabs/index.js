import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import TABS from '../../config/TABS_CONFIG';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';

function DeskTabs() {
	const { shipmentType, stepperTab } = useContext(CostBookingDeskContext);
	console.log({ stepperTab });
	const stepperTabs = TABS?.[shipmentType]?.[stepperTab];

	return (
		<Tabs>
			{stepperTabs?.map((tab) => (
				<TabPanel
					title={tab?.title}
					key={tab?.name}
					name={tab.name}
				/>
			))}
		</Tabs>
	);
}

export default DeskTabs;
