import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import FCL_TABS from '../../../configs/FCL_TABS';

function DeskTabs({ stateProps = {} }) {
	const { activeTab, setActiveTab, filters, setFilters } = stateProps || {};

	const tabs = FCL_TABS.map((k) => ({ title: startCase(k), name: k }));

	const onTabChange = (val) => {
		setActiveTab(val);
		setFilters({ ...filters, page: 1 });
	};

	return (
		<div>
			<Tabs
				themeType="primary"
				activeTab={activeTab}
				onChange={onTabChange}
			>
				{tabs.map((tab) => <TabPanel {...tab} />)}
			</Tabs>
		</div>
	);
}
export default DeskTabs;
