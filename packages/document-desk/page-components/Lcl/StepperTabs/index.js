import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import controlConfig from '../../../configs/LCL/CONTROLS_CONFIG.json';
import tabsConfig from '../../../configs/LCL/TAB_CONFIG.json';
import DocumentDeskContext from '../../../context/DocumentDeskContext';

function StepperTabs() {
	const { stepperTab, filters, setFilters, setActiveTab, setStepperTab } = useContext(DocumentDeskContext);

	const onStepperTabChange = (val) => {
		const firstTab = tabsConfig[val]?.[0];

		const tempFilters = filters;
		tempFilters.page = 1;
		tempFilters.isCriticalOn = firstTab?.isCriticalVisible && filters?.isCriticalOn;

		setActiveTab(firstTab.value);
		setFilters(tempFilters);
		setStepperTab(val);
	};

	return (
		<Tabs themeType="primary" onChange={onStepperTabChange} activeTab={stepperTab}>
			{controlConfig.stepper_tabs.map((tab) => (
				<TabPanel
					key={tab.value}
					title={tab.label}
					name={tab.value}
				/>
			))}
		</Tabs>
	);
}

export default StepperTabs;
