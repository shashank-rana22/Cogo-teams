import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import Entity from './Entity';
import Reports from './Reports';
import styles from './styles.module.css';

const ENTITY_TAB = Object.keys(GLOBAL_CONSTANTS.cogoport_entities);

function Header({ filters = {}, setFilters = () => {} }) {
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
				{ENTITY_TAB.map(
					(entity) => (
						<TabPanel
							key={entity}
							id={entity}
							name={entity}
							title={<Entity entityCode={entity} />}
						/>
					),
				)}
				<TabPanel id="reports" name="reports" title={<Reports />} />
			</Tabs>
		</div>
	);
}
export default Header;
