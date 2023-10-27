import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import SERVICE_TABS_MAPPING from '../../utils/service-tabs-mapping';

import styles from './styles.module.css';

function HandlingFees() {
	const [activeService, setActiveService] = useState('fcl_freight');

	return (
		<div className={styles.service_tab}>
			<Tabs
				themeType="primary"
				activeTab={activeService}
				onChange={(val) => {
					setActiveService(val);
				}}
			>
				{(SERVICE_TABS_MAPPING).map((item) => {
					const { label = '', value = '' } = item;
					return 	<TabPanel themeType="primary" key={value} name={value} title={label} />;
				})}

			</Tabs>
		</div>
	);
}

export default HandlingFees;
