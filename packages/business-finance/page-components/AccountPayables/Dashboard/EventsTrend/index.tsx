import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import SegmentedControl from '../../../commons/SegmentedControl';

import { filterControls } from './filterControl';
import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Daily',
		value : 'daily',
	},
	{
		label : 'Weekly',
		value : 'weekly',
	},
	{
		label : 'Monthly',
		value : 'monthly',
	},
];
interface ItemProps {
	showData:string;
	setShowData:Function;
}

function EventsTrend({ showData, setShowData }:ItemProps) {
	const [showEventsData, setShowEventsData] = useState({ events: '' });
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Events Trend
						<div className={styles.hr} />
					</div>
					<Tooltip placement="top" content="jaiprakash">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.filter}>
					<div className={styles.segmented_filter}>
						<SegmentedControl
							options={OPTIONS}
							activeTab={showData}
							setActiveTab={setShowData}
							color="#ED3726"
							background="#FFFAEB"
						/>

					</div>
					<div>
						<Filter controls={filterControls} filters={showEventsData} setFilters={setShowEventsData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventsTrend;
