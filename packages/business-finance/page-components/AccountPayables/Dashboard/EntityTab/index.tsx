import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import Entity from '../TreasuryStatistics/Entity';

import styles from './styles.module.css';

interface ItemProps {
	activeTab:string,
	setActiveTab:Function,
}

function EntityTab({ activeTab, setActiveTab }:ItemProps) {
	return (
		<div className={styles.container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="ALL" title={<Entity entityCode="all" />} />

					<TabPanel name="101" title={<Entity entityCode="101" />} />
					<TabPanel name="201" title={<Entity entityCode="201" />} />
					<TabPanel name="301" title={<Entity entityCode="301" />} />
					<TabPanel name="401" title={<Entity entityCode="401" />} />
				</Tabs>
			</div>
		</div>
	);
}

export default EntityTab;
