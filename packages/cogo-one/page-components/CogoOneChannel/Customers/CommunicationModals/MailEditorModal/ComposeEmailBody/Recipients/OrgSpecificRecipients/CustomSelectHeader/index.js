import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import { ORGS_MAPPING, USERS_MAPPING } from '../../../../../../../../../constants/mailConstants';

import styles from './styles.module.css';

function CustomSelectHeader({
	setActiveTab = () => {},
	activeTab = '',
	allowedOrgs = [],
	type = '',
}) {
	const mapping = type === 'users_select' ? USERS_MAPPING : ORGS_MAPPING;

	const allowedList = type === 'users_select' ? Object.keys(USERS_MAPPING) : allowedOrgs;

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				{allowedList?.map(
					(item) => (
						<TabPanel
							key={mapping?.[item]?.value}
							name={mapping?.[item]?.value}
							title={mapping?.[item]?.title}
						/>
					),
				)}
			</Tabs>
		</div>
	);
}

export default CustomSelectHeader;
