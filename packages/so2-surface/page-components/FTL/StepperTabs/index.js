import { useContext } from 'react';
import { Tabs, TabPanel } from '@cogoport/components';
import { v4 as uuidv4 } from 'uuid';

import controlConfig from '../../../configs/CONTROLS_CONFIG.json';
import TabContainer from '../../../configs/TAB_CONFIG';
import DashboardContext from '../../../context/DashboardContext';

function StepperTabs() {
	const { stepperTab, filters, setFilters, setActiveTab, setStepperTab } = useContext(DashboardContext);
	const tabsConfig = TabContainer();
	const onStepperTabChange = (val) => {
		const firstTab = tabsConfig[val]?.[0];

		const tempFilters = filters;
		tempFilters.page = 1;
		setActiveTab(firstTab.value);
		setFilters(tempFilters);
		setStepperTab(val);
	};

	return (

		<Tabs themeType="primary" onChange={onStepperTabChange} activeTab={stepperTab}>
			{controlConfig.stepper_tabs.map((tab) => (
				<TabPanel
					key={uuidv4()}
					title={tab.label}
					name={tab.value}
				/>
			))}
		</Tabs>
	);
}

export default StepperTabs;
