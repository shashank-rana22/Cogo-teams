import { Toggle, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetDailyPayableOutstanding from '../hooks/useGetDailyPayableOutstanding';

import styles from './styles.module.css';

function DailyPayableOutstanding() {
	const [isQuarterView, setIsQuarterView] = useState(false);
	const { data } = useGetDailyPayableOutstanding({ isQuarterView });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Daily Payable Outstanding
						<div className={styles.hr} />
					</div>
					<Tooltip
						placement="top"
						content="Days payable outstanding (DPO) is a financial ratio that indicates
						the average time (in days) that a company takes to pay its bills and invoices"
					>
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.toggle}>
					<div className={styles.heading_text}>
						Quarter View
					</div>
					<Toggle
						name="view"
						size="md"
						showOnOff
						value={isQuarterView}
						onChange={() => setIsQuarterView(!isQuarterView)}
						disabled={false}
					/>
				</div>
			</div>
			{!isQuarterView
				? (
					<div className={styles.sub_container}>
						<div className={styles.month_container}>
							<div className={styles.value}>
								<Tooltip content={data?.[2]?.dpo} placement="top" interactive>
									{data?.[2]?.dpo?.toFixed(2)}
								</Tooltip>

							</div>
							<div className={styles.label}>
								{format(data?.[2]?.yearMonth, ' MMM yyyy')}
								{/* current month - march 2022 */}
							</div>
						</div>
						<div className={styles.month_container}>
							<div className={styles.value}>
								<Tooltip content={data?.[1]?.dpo} placement="top" interactive>
									{data?.[1]?.dpo?.toFixed(2)}
								</Tooltip>
							</div>
							<div className={styles.label}>
								{format(data?.[1]?.yearMonth, ' MMM yyyy')}
							</div>
						</div>
						<div className={styles.month_container}>
							<div className={styles.value}>
								<Tooltip content={data?.[0]?.dpo} placement="top" interactive>
									{data?.[0]?.dpo?.toFixed(2)}
								</Tooltip>
							</div>
							<div className={styles.label}>
								{format(data?.[0]?.yearMonth, ' MMM yyyy')}
							</div>
						</div>
					</div>
				) : (
					<div className={styles.sub_container}>
						<div className={styles.month_box}>
							<div className={styles.value}>
								<Tooltip content={data?.[0]?.dpo} placement="top" interactive>
									{data?.[0]?.dpo?.toFixed(2)}
								</Tooltip>
							</div>
							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q1
								</div>
								<div className={styles.label}>
									-
									{format(data?.[0]?.yearMonth, 'MMM')}
									-Feb-March
								</div>
							</div>

						</div>
						<div className={styles.month_box}>
							<div className={styles.value}>
								<Tooltip content={data?.[1]?.dpo} placement="top" interactive>
									{data?.[1]?.dpo?.toFixed(2) || 0}
								</Tooltip>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q2
								</div>
								<div className={styles.label}>
									- Apr-May-Jun
								</div>
							</div>

						</div>
						<div className={styles.month_box}>
							<div className={styles.value}>
								<Tooltip content={data?.[2]?.dpo} placement="top" interactive>
									{data?.[2]?.dpo?.toFixed(2) || 0}
								</Tooltip>
							</div>
							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q3
								</div>
								<div className={styles.label}>
									- Jul-Aug-Sep
								</div>
							</div>

						</div>
						<div className={styles.month_box}>
							<div className={styles.value}>
								<Tooltip content={data?.[3]?.dpo} placement="top" interactive>
									{data?.[3]?.dpo || 0}
								</Tooltip>
							</div>
							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q4
								</div>
								<div className={styles.label}>
									- Oct-Nov-Dec
								</div>
							</div>
						</div>
					</div>
				)}
		</div>
	);
}

export default DailyPayableOutstanding;
