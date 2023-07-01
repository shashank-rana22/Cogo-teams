import { Tabs, TabPanel } from '@cogoport/components';
import { useContext } from 'react';

import TABS from '../../config/TABS_CONFIG';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';
import getIsTabCritical from '../../helpers/getIsTabCritical';

function DeskTabs() {
	const {
		shipmentType = '', stepperTab = '', activeTab = '',
		filters = {}, setFilters = () => {}, setActiveTab = () => {},
	} = useContext(CostBookingDeskContext);

	const stepperTabs = TABS?.[shipmentType]?.[stepperTab];

	const handleTabChange = (val) => {
		if (val === activeTab) return;

		const isTabCritical = getIsTabCritical({ shipmentType, stepperTab, activeTab: val });
		setFilters({ ...filters, criticalOn: filters.criticalOn && isTabCritical, page: 1 });
		setActiveTab(val);
	};

	return (
		<Tabs
			activeTab={activeTab}
			onChange={handleTabChange}
		>
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
