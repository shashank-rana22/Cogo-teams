import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import Entity from './Entity';
import styles from './styles.module.css';

function EntityTab({ filterValue, setFilterValue }) {
	const onChange = (val, name) => {
		setFilterValue((p) => ({ ...p, [name]: val }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={filterValue?.entityCode}
					themeType="secondary"
					onChange={(val) => onChange(val, 'entityCode')}
				>
					<TabPanel name="101" title={<Entity entityCode="101" />} />
					<TabPanel name="201" title={<Entity entityCode="201" />} />
					<TabPanel name="301" title={<Entity entityCode="301" />} />
					<TabPanel name="401" title={<Entity entityCode="401" />} />
					<TabPanel name="501" title={<Entity entityCode="501" />} />
				</Tabs>
			</div>
		</div>
	);
}

export default EntityTab;
