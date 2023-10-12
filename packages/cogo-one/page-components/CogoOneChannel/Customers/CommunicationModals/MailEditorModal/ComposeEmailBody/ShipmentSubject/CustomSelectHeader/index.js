import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import { SUBJECT_MAPPING } from '../../../../../../../../constants/mailConstants';

import styles from './styles.module.css';

function CustomSelectHeader({
	setActiveTab = () => {},
	activeTab = '',
}) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				{Object.values(SUBJECT_MAPPING).map((item) => (
					<TabPanel
						key={item.value}
						name={item.value}
						title={item.title}
					/>
				))}
			</Tabs>
		</div>
	);
}

export default CustomSelectHeader;
