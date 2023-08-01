import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMProfile, IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_STATUS_TABS, FILTER_TAB } from '../utils/constants';

import styles from './styles.module.css';

function Header({
	activeTab = 'confirmed', setFilters = () => {}, data = {},
	setSearchText = '',
	setSortType = '',
	totalEmployeeCount = 0,
	employeeFilters = {},
	getEmployeeList = () => {},
	setSelectedIds = () => {},
}) {
	const handleTabChange = (e) => {
		setFilters({ page: 1, employee_status: e });
		setSearchText('');
		setSortType('');
		setSelectedIds([]);
	};

	const handleDownload = async () => {
		const res = await getEmployeeList(true);

		window.open(res.data, '_self');
	};

	const isEmptyFilters = isEmpty(employeeFilters);

	const TABS = isEmptyFilters ? EMPLOYEE_STATUS_TABS : FILTER_TAB;

	return (
		<div className={styles.container}>
			<Tabs
				tabIcon={<IcMProfile />}
				activeTab={activeTab}
				themeType="primary"
				className={!isEmptyFilters && styles.tab_disabled}
				onChange={(e) => handleTabChange(e)}
			>
				{TABS.map((val) => (
					<TabPanel
						key={val.value}
						name={val.value}
						title={val.label}
						badge={data[val.value] || totalEmployeeCount}
					/>
				))}
			</Tabs>
			<Button size="md" className={styles.download_btn} themeType="accent" onClick={handleDownload}>
				<IcMDownload />
				{' '}
				<span className={styles.download_text}>Download Current View</span>
			</Button>
		</div>
	);
}

export default Header;
