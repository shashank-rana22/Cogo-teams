import { Tabs, TabPanel, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { cogoOneLogo } from '../../page-components/CogoOneDashboard/constants';
import Filter from '../Filter';

import styles from './styles.module.css';

function Header({ setCalendarType, calendarType }) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState('');

	console.log(filters, 'filters');
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div>
					<img
						src={cogoOneLogo}
						alt="-"
					/>
				</div>
				<div className={styles.heading_name}>CogoOne Dashboard</div>
			</div>

			<div className={styles.header_right_section}>

				<div className={styles.filter_dot} />
				<div className={styles.filter_icon}>
					<Popover
						placement="left"
						render={(
							<Filter
								setFilterVisible={setFilterVisible}
								// activityTab={activityTab}
								filters={filters}
								setFilters={setFilters}
							/>
						)}
						visible={filterVisible}
						onClickOutside={() => setFilterVisible(false)}
					>

						<IcMFilter width={25} height={25} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>
				</div>

				<Tabs
					activeTab={calendarType}
					themeType="tertiary"
					onChange={setCalendarType}
				>
					<TabPanel name="day" title="Day" />
					<TabPanel name="week" title="Week" />
					<TabPanel name="month" title="Month" />
				</Tabs>

			</div>

		</div>
	);
}

export default Header;
