import { TabPanel, Tabs } from '@cogoport/components';

import Entity from './Entity';
import Reports from './Reports';
import styles from './styles.module.css';

function Header({ filters, setFilters }) {
	const onEntityChange = (val) => {
		setFilters({ ...filters, activeEntity: val });
	};
	return (
		<div className={styles.container}>
			<Tabs
				themeType="primary"
				activeTab={filters?.activeEntity}
				onChange={onEntityChange}
			>
				<TabPanel id="101" name="101" title={<Entity entityCode="101" />} />
				<TabPanel id="202" name="201" title={<Entity entityCode="201" />} />
				<TabPanel id="301" name="301" title={<Entity entityCode="301" />} />
				<TabPanel id="401" name="401" title={<Entity entityCode="401" />} />
				<TabPanel id="501" name="501" title={<Entity entityCode="501" />} />
				<TabPanel id="reports" name="reports" title={<Reports />} />
			</Tabs>
		</div>
	);
}
export default Header;
