import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import controlConfig from '../../../configs/CONTROLS_CONFIG.json';
import TabContainer from '../../../configs/TAB_CONFIG';
import DocumentDeskContext from '../../../context/DocumentDeskContext';

function StepperTabs() {
	const { stepperTab, filters, setFilters, setActiveTab, setStepperTab } = useContext(DocumentDeskContext);
	const tabsConfig = TabContainer();
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
					title={tab.label}
					name={tab.value}
				/>
			))}
		</Tabs>
	);
}

export default StepperTabs;
