import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import shipmentTabMapping from '../../config/SHIPMENT_TAB_MAPPING';
import KamDeskContext from '../../context/KamDeskContext';

function DeskTabs() {
	const { stepperTab, shipmentType, activeTab, setActiveTab, setFilters } = useContext(KamDeskContext);
	const tabs = shipmentTabMapping[shipmentType]?.tabs || shipmentTabMapping[shipmentType]?.[stepperTab]?.tabs || [];

	const handleChange = (val) => {
		setActiveTab(val);
		setFilters((prev) => ({ ...prev, page: 1 }));
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
