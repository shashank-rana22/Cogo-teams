import { TabPanel, Tabs } from '@cogoport/components';

import Entity from './Entity';
import Reports from './Reports';
import styles from './styles.module.css';

function Header({ filters = {}, setFilters = () => {}, currentEntity }) {
	const onEntityChange = (val) => {
		setFilters((prev) => ({ ...prev, activeEntity: val }));
	};
	return (
		<div className={styles.container}>
			<Tabs
				themeType="primary"
				activeTab={filters?.activeEntity}
				onChange={onEntityChange}
			>

				<TabPanel
					key={currentEntity}
					id={currentEntity}
					name={currentEntity}
					title={<Entity entityCode={currentEntity} />}
				/>

				<TabPanel id="reports" name="reports" title={<Reports />} />
			</Tabs>
		</div>
	);
}
export default Header;
