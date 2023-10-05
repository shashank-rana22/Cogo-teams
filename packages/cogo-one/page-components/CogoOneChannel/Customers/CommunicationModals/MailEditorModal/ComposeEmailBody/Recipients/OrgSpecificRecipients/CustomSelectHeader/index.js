import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import { ORGS_MAPPING } from '../../../../../../../../../constants/mailConstants';

import styles from './styles.module.css';

function CustomSelectHeader({
	setActiveTab = () => {},
	activeTab = '',
	allowedOrgs = [],
}) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				{allowedOrgs?.map(
					(item) => (
						<TabPanel
							key={ORGS_MAPPING?.[item]?.value}
							name={ORGS_MAPPING?.[item]?.value}
							title={ORGS_MAPPING?.[item]?.title}
						/>
					),
				)}
			</Tabs>
		</div>
	);
}

export default CustomSelectHeader;
