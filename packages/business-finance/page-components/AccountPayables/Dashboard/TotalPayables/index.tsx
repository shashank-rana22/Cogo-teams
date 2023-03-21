import { Popover, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMArrowRotateDown, IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import SegmentedControl from '../../../commons/SegmentedControl';
import useGetTotalPayables from '../hooks/useGetTotalPayables';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import ProgressLine from './ProgressLine';
import styles from './styles.module.css';

interface ItemProps {
	payablesFilter:string;
	setPayablesFilter:Function;
	// progress:string;
	// setProgress:Function;
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
	payablesFilter, setPayablesFilter,
}:ItemProps) {
	const { data } = useGetTotalPayables();

	const {
		currentAmount,
		currentCount,
		overDueAmount,
		overDueCount,
	} = data || {};

	const totalAmount = currentAmount + overDueAmount;
	const amountPercentage = (overDueAmount * 100) / totalAmount;
	console.log(amountPercentage, 'amountPercentage');

	// const [progress, setProgress] = useState('30');
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
						<div className={styles.point_label}>
							<Tooltip content={getFormattedPrice(currentAmount, 'INR')} placement="top" interactive>
								<div className={styles.value}>
									INR
									{' '}
									{getAmountInLakhCrK(currentAmount)}
								</div>
							</Tooltip>
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
							<Tooltip content={getFormattedPrice(overDueAmount, 'INR')} placement="top" interactive>
								<div className={styles.value}>
									INR
									{' '}
									{getAmountInLakhCrK(overDueAmount)}
								</div>
							</Tooltip>
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
					{/* <ProgressBar progress={progress} setProgress={setProgress} /> */}
					<ProgressLine progress={amountPercentage} />
					<div className={styles.point_label}>
						<div className={styles.label}>
							Total Unpaid Invoices :
						</div>
						<Tooltip
							content={getFormattedPrice((currentAmount + overDueAmount), 'INR')}
							placement="top"
							interactive
						>
							<div className={styles.value}>
								INR
								{' '}
								{getAmountInLakhCrK(currentAmount + overDueAmount)}
								{' '}
								(
								{currentCount + overDueCount}
								)
							</div>
						</Tooltip>
					</div>
				</div>
			</div>

		</div>
	);
}

export default TotalPayables;
