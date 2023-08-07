import { TabPanel, Tabs } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ filters = {}, setFilters = () => {}, setActiveEntity }) {
	const onEntityChange = (val) => {
		setFilters((prev) => ({ ...prev, activeEntity: val }));
		if (val === 'reports') {
			setActiveEntity('');
		}
	};
	return (
		<div className={styles.container}>
			<Tabs
				themeType="primary"
				activeTab={filters?.activeEntity}
				onChange={onEntityChange}
			>
				<TabPanel id="reports" name="reports" title="Reports" />
			</Tabs>
		</div>
	);
}
export default Header;
