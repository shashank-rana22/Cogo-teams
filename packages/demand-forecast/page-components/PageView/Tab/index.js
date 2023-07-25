import { TabPanel, Tabs } from '@cogoport/components';

const TABS_MAPPING = [
	{
		name  : 'port_pairs',
		title : 'Port Pairs',

	},
	{
		name  : 'clusters',
		title : 'Clusters',

	},
];

function Tab({ activeTab, setActiveTab }) {
	// useEffect(() => {

	// }, [activeTab]);

	return (
		<div style={{ marginBottom: 20 }}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				fullWidth
				themeType="primary"
			>
				{TABS_MAPPING.map((tabItem) => {
					const { name, title } = tabItem;

					return (
						<TabPanel key={name} name={name} title={title} />
					);
				})}
			</Tabs>
		</div>
	);
}

export default Tab;
