import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import shipmentTabMapping from '../../config/SHIPMENT_TAB_MAPPING';
import { CRITICAL_TABS } from '../../config/SHIPMENTS_PAYLOAD';
import KamDeskContext from '../../context/KamDeskContext';

function DeskTabs() {
	const { stepperTab, shipmentType, activeTab, setActiveTab, setFilters, filters } = useContext(KamDeskContext);

	const tabs = shipmentTabMapping[shipmentType]?.tabs || shipmentTabMapping[shipmentType]?.[stepperTab]?.tabs || [];

	const handleChange = (val) => {
		if (val !== activeTab) {
			const isCritical = !!CRITICAL_TABS?.[shipmentType]?.[stepperTab]?.[val];

			setActiveTab(val);

			setFilters({
				...filters,
				page: 1,
				...(isCritical && filters.criticalOn ? { criticalOn: true } : {}),
			});
		}
	};

	return (
		<div>
			<Tabs themeType="secondary" activeTab={activeTab} onChange={handleChange}>
				{tabs?.map((tab) => (
					<TabPanel
						title={tab.label}
						key={tab.value}
						name={tab.value}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default DeskTabs;
