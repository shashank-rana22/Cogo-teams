import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';

// import GaugeChart from './GaugeChart';
import styles from './styles.module.css';
import { timeFrameControls } from './timeFrameControls';

function BillTurnAroundTime() {
	const [timeFrameFilter, setTimeFrameFilter] = useState({ timeframe: '' });
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

			</div>
			<div className={styles.filter}>
				<div className={styles.label}>
					Time Frame
				</div>
				<Filter controls={timeFrameControls} filters={timeFrameFilter} setFilters={setTimeFrameFilter} />
			</div>
			{/* <GaugeChart /> */}
		</div>
	);
}

export default BillTurnAroundTime;
