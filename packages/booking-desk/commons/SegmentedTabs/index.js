import { Tabs, TabPanel } from '@cogoport/components';

export default function SegmentedTabs({ options = [], value = '', onChange = () => {} }) {
	return (
		<Tabs
			themeType="primary"
			activeTab={value}
			onChange={onChange}
		>
			{options.map((tab) => (
				<TabPanel key={tab.name} {...tab} />
			))}
		</Tabs>
	);
}
