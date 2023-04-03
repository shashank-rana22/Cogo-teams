import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import Entity from './Entity';
import styles from './styles.module.css';

interface FilterValueProps {
	entityCode?: string,
}

interface ItemProps {
	filterValue?:FilterValueProps,
	setFilterValue?: (p: object) => void,
}

function EntityTab({ filterValue, setFilterValue }: ItemProps) {
	const onChange = (val:string, name:string) => {
		setFilterValue((p) => ({ ...p, [name]: val }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={filterValue?.entityCode}
					themeType="secondary"
					onChange={(val:string) => onChange(val, 'entityCode')}
				>
					<TabPanel name="101" title={<Entity entityCode="101" /> as unknown as string} />
					<TabPanel name="201" title={<Entity entityCode="201" /> as unknown as string} />
					<TabPanel name="301" title={<Entity entityCode="301" /> as unknown as string} />
					<TabPanel name="401" title={<Entity entityCode="401" /> as unknown as string} />
					<TabPanel name="501" title={<Entity entityCode="501" /> as unknown as string} />
				</Tabs>
			</div>
		</div>
	);
}

export default EntityTab;
