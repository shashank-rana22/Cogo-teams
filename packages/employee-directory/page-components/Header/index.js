import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMProfile, IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import { EMPLOYEE_STATUS_TABS } from '../utils/constants';

import styles from './styles.module.css';

function Header({
	activeTab = 'confirmed', setFilters = () => {}, data = {},
	setSearchText = '',
	setSortType = '',
	totalEmployeeCount = 0,
}) {
	const handleTabChange = (e) => {
		setFilters({ page: 1, employee_status: e });
		setSearchText('');
		setSortType('');
	};

	return (
		<div className={styles.container}>
			<Tabs
				tabIcon={<IcMProfile />}
				activeTab={activeTab}
				themeType="primary"
				onChange={(e) => handleTabChange(e)}
			>
				{EMPLOYEE_STATUS_TABS.map((val) => (
					<TabPanel
						key={val.value}
						name={val.value}
						title={val.label}
						badge={data[val.value] || totalEmployeeCount}
					/>
				))}
			</Tabs>
			<Button size="md" themeType="accent">
				<IcMDownload />
				{' '}
				<span className={styles.download_text}>Download Current View</span>
			</Button>
		</div>
	);
}

export default Header;
