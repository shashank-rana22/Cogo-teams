import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import { cogoOneLogo } from '../constants';

import styles from './styles.module.css';

function Header() {
	const [activeTab, setActiveTab] = useState('day');

	return (
		<>
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
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="day" title="Day" />
					<TabPanel name="week" title="Week" />
					<TabPanel name="month" title="Month" />
				</Tabs>
			</div>

			{
	activeTab === 'day' && <div>day comp</div>
			}

		</>
	);
}

export default Header;
