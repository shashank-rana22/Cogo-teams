import { Popover, ProgressBar, Tooltip } from '@cogoport/components';
import { IcMArrowRotateDown, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import SegmentedControl from '../../../commons/SegmentedControl';

import styles from './styles.module.css';

interface ItemProps {
	payablesFilter:string;
	setPayablesFilter:Function;
	progress:string;
	setProgress:Function;
}
const OPTIONS = [
	{
		label : 'Overall',
		value : 'overall',
	},
	{
		label : 'Logistics',
		value : 'logistics',
	},
	{
		label : 'Overheads',
		value : 'overheads',
	},
];
const content = (
	<div className={styles.popover}>
		<div className={styles.row}>
			<div className={styles.label}>
				1 - 15 Days
			</div>
			<div className={styles.label}>
				INR 60,0000 | SDG 25
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>
				1 - 15 Days
			</div>
			<div className={styles.label}>
				INR 60,0000 | SDG 25
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>
				15 - 30 Days
			</div>
			<div className={styles.label}>
				INR 60,0000 | SDG 25
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>
				30 - 45 Days
			</div>
			<div className={styles.label}>
				INR 60,0000 | SDG 25
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>
				45 - 60 Days
			</div>
			<div className={styles.label}>
				INR 60,0000 | SDG 25
			</div>
		</div>
		<div className={styles.row}>
			<div className={styles.label}>
				90 - 180 Days
			</div>
			<div className={styles.label}>
				INR 60,0000 | SDG 25
			</div>
		</div>
	</div>
);

function TotalPayables({
	payablesFilter, setPayablesFilter, progress,
	setProgress,
}:ItemProps) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Total Payables
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content="Current and overdue amount
						that you are yet to pay your vendor"
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<SegmentedControl
						options={OPTIONS}
						activeTab={payablesFilter}
						setActiveTab={setPayablesFilter}
						color="#ED3726"
						background="#FFFAEB"
					/>
				</div>
			</div>
			<div className={styles.amount_container}>
				<div className={styles.amount_div}>

					<div className={styles.amount}>
						<div className={styles.point_label}>
							<div className={styles.point} />
							<div className={styles.label}>
								Current
							</div>
						</div>
						<div className={styles.value}>
							INR 20,000,000
						</div>
					</div>
					<div className={styles.amount}>
						<div className={styles.point_label}>
							<div className={styles.green_point} />
							<div className={styles.label}>
								Overdue
							</div>
						</div>
						<div className={styles.point_label}>
							<div className={styles.value}>
								INR 4,000,000
							</div>
							<div className={styles.down}>
								<Popover placement="bottom" render={content}>
									<IcMArrowRotateDown />
								</Popover>
							</div>

						</div>

					</div>
				</div>
				<div className={styles.vr} />
				<div className={styles.progress_bar}>
					<ProgressBar progress={progress} setProgress={setProgress} />
					<div className={styles.point_label}>
						<div className={styles.label}>
							Total Unpaid Invoices :
						</div>
						<div className={styles.value}>
							INR 24,000,00 (300)
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}

export default TotalPayables;
