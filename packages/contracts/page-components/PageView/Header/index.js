import { TabPanel, Tabs } from '@cogoport/components';

import TABS_MAPPING from '../../../confifurations/tabs';

function Header({ activeTab, setActiveTab }) {
	return (
		<div>
			<Tabs activeTab={activeTab} onChange={setActiveTab} id="locations_tab_view">
				{TABS_MAPPING.map(({ label = '', value = '' }) => <TabPanel name={value} title={label} />)}
			</Tabs>
		</div>
	);
}

export default Header;
