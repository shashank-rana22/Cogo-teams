import { TabPanel, Tabs } from '@cogoport/components';
import { useContext } from 'react';

import shipmentStepperTabs from '../../config/SHIPMENT_STEPPER_TABS.json';
import shipmentTabMapping from '../../config/SHIPMENT_TAB_MAPPING';
import KamDeskContext from '../../context/KamDeskContext';

const findValueInArray = ({ value, arr = [] }) => !!arr?.some((i) => i?.value === value);

function StepperTabs() {
	const {
		stepperTab, shipmentType, setStepperTab, filters, setFilters,
		setActiveTab, activeTab,
	} = useContext(KamDeskContext);

	const stepperTabs = shipmentStepperTabs[shipmentType];

	const shipmentConfig = shipmentTabMapping[shipmentType];

	const { page, ...restFilters } = filters || {};

	const handleChange = (val) => {
		const tabs = shipmentConfig?.[val]?.tabs;
		const tempActiveTab = findValueInArray({ value: activeTab, arr: tabs }) ? activeTab : tabs?.[0]?.value;

		setFilters({ page: 1, ...restFilters });
		setStepperTab(val);
		setActiveTab(tempActiveTab);
	};

	return (
		<div>
			<Tabs activeTab={stepperTab} themeType="primary" onChange={handleChange}>
				{stepperTabs.map((tab) => (
					<TabPanel
						key={tab.value}
						title={tab.label}
						name={tab.value}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default StepperTabs;
