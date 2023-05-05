import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import CONTROL_CONFIG from '../../config/CONTROLS_CONFIG.json';
import TABS from '../../config/TABS_CONFIG';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';
import getIsDateFilterVisible from '../../helpers/getIsDateFilterVisible';
import getIsTabCritical from '../../helpers/getIsTabCritical';

function StepperTabs() {
	const {
		shipmentType = '', stepperTab = '', setStepperTab = () => {}, setActiveTab = () => {},
		filters = {}, setFilters = () => {},
	} =	 useContext(CostBookingDeskContext);

	const stepperTabs = CONTROL_CONFIG[shipmentType];

	const handleTabChange = (val) => {
		if (val === stepperTab) return;

		const stepperConfig = TABS[shipmentType]?.[val];
		const tempActiveTab = stepperConfig?.[0]?.name;

		const isDateFilterVisible = getIsDateFilterVisible({ shipmentType, stepperTab: val });
		const isCritical = getIsTabCritical({ shipmentType, stepperTab: val, activeTab: tempActiveTab });

		setFilters({
			...(isDateFilterVisible ? filters : {}),
			q          : filters.q || '',
			page       : 1,
			criticalOn : filters?.criticalOn && isCritical,
		});

		setActiveTab(tempActiveTab);
		setStepperTab(val);
	};

	return (
		<Tabs themeType="primary" onChange={handleTabChange} activeTab={stepperTab}>
			{stepperTabs?.map((tab) => (
				<TabPanel
					title={tab.label}
					name={tab.value}
					key={tab.value}
				/>
			))}
		</Tabs>
	);
}

export default StepperTabs;
