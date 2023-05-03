import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import CONTROL_CONFIG from '../../config/CONTROLS_CONFIG.json';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';

function StepperTabs() {
	const { shipmentType } = useContext(CostBookingDeskContext);
	const stepperTabs = CONTROL_CONFIG[shipmentType];

	return (
		<div>
			<Tabs themeType="primary">
				{stepperTabs?.map((tab) => (
					<TabPanel
						title={tab.label}
						name={tab.value}
						key={tab.value}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default StepperTabs;
