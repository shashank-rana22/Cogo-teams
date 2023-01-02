import { TabPanel, Tabs } from '@cogoport/components';

import TABS_MAPPING from '../../../configurations/tabs';

function Header({ filters, setFilters }) {
	return (
		<div>
			<Tabs
				activeTab={filters?.status}
				onChange={(val) => {
					setFilters({ ...filters, status: val });
				}}
				id="contracts_tab_view"
			>
				{TABS_MAPPING.map(({ label = '', value = '' }) => <TabPanel name={value} title={label} />)}
			</Tabs>
		</div>
	);
}

export default Header;
