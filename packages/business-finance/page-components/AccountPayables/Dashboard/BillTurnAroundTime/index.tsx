import { Select, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';

// import GaugeChart from './GaugeChart';
import styles from './styles.module.css';
import { timeFrameControls } from './timeFrameControls';

const options = [
	{ label: 'SO2 upload', value: 'SO2_upload' },
	{ label: ' COE approved', value: ' COE_approved' },
	{ label: 'PayRun creation', value: 'PayRun_creation' },
	{ label: 'Bank allocation', value: 'Bank_allocation' },
	{ label: 'First UTR Upload', value: 'First_UTR_Upload' },
	{ label: 'Last UTR', value: 'last_UTR' },
];

function BillTurnAroundTime() {
	const [timeFrameFilter, setTimeFrameFilter] = useState({ events: '' });
	const [timeFrameFilter1, setTimeFrameFilter1] = useState('');
	const [timeFrameFilter2, setTimeFrameFilter2] = useState('');
	const [timeFrameFilter3, setTimeFrameFilter3] = useState('');
	const [timeFrameFilter4, setTimeFrameFilter4] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Bill Turn Around Time
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content="Turnaround time for Bill to move from one status to
						another that involves human intervention"
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.date_filter}>
					<Filter controls={timeFrameControls} filters={timeFrameFilter} setFilters={setTimeFrameFilter} />
				</div>
			</div>
			<div className={styles.filter}>
				<div className={styles.select_filter}>
					<div className={styles.gauge_filter}>
						<div className={styles.label}>
							Select Start Task
						</div>
						<Select
							name="first"
							value={timeFrameFilter1}
							onChange={setTimeFrameFilter1}
							placeholder="From"
							options={options}
							size="sm"
							isClearable
						/>
					</div>
					<div>
						<div className={styles.label}>
							Select End Task
						</div>
						<Select
							name="second"
							value={timeFrameFilter2}
							onChange={setTimeFrameFilter2}
							placeholder="To"
							options={options}
							size="sm"
							isClearable
						/>
					</div>
				</div>
				<div className={styles.select_filter}>
					{/* <GaugeChart /> */}
				</div>

				<div className={styles.select_filter}>
					<div>
						<div className={styles.label}>
							Select Start Task
						</div>
						<Select
							name="first"
							value={timeFrameFilter3}
							onChange={setTimeFrameFilter3}
							placeholder="From"
							options={options}
							size="sm"
							isClearable
						/>
					</div>
					<div>
						<div className={styles.label}>
							Select End Task
						</div>
						<Select
							name="second"
							value={timeFrameFilter4}
							onChange={setTimeFrameFilter4}
							placeholder="To"
							options={options}
							size="sm"
							isClearable
						/>
					</div>
				</div>
				<div className={styles.select_filter}>
					{/* <GaugeChart /> */}
				</div>
			</div>
			{/* <GaugeChart /> */}
		</div>
	);
}

export default BillTurnAroundTime;
