import { Placeholder, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import useGetTotalPayables from '../hooks/useGetTotalPayables';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import ProgressLine from './ProgressLine';
import styles from './styles.module.css';

interface FilterProps {
	currency:string,
	service:string,
}
interface ItemProps {
	filtersData:FilterProps;
	activeTab:string
}

function TotalPayables({
	filtersData,
	activeTab,
}:ItemProps) {
	const { data, loading } = useGetTotalPayables({ filtersData, activeTab });

	const {
		currentAmount,
		currentPercent,
		overDueAmount,
		overDuePercent,
		todayDueAmount,
		todayDuePercent,
	} = data || {};

	return (
		<div className={styles.container}>

			<div className={styles.amount_container}>
				<div className={styles.amount_div}>

					<div className={styles.amount}>
						<div className={styles.point_label}>
							<div className={styles.green} />
							<div className={styles.label}>
								Not Due
							</div>
						</div>
						{loading ? <Placeholder height="16px" width="100px" margin="4px 12px 0px 8px" />
							: (
								<div className={styles.point_label}>
									<Tooltip
										content={getFormattedPrice(currentAmount, 'INR')}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											INR
											{' '}
											{getAmountInLakhCrK(currentAmount)}
											<div style={{ fontWeight: 500, fontSize: 13, marginTop: 2, marginLeft: 2 }}>
												{' '}
												(
												{currentPercent}
												%)
											</div>
										</div>
									</Tooltip>
								</div>
							)}
					</div>
					<div className={styles.amount}>
						<div className={styles.point_label}>
							<div className={styles.point} />
							<div className={styles.label}>
								Today
							</div>
						</div>
						{loading ? <Placeholder height="16px" width="100px" margin="4px 12px 0px 8px" />
							:						(
								<div className={styles.point_label}>
									<Tooltip
										content={getFormattedPrice(todayDueAmount, 'INR')}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											INR
											{' '}
											{getAmountInLakhCrK(todayDueAmount)}
											<div style={{ fontWeight: 500, fontSize: 13, marginTop: 2, marginLeft: 2 }}>
												{' '}
												(
												{todayDuePercent}
												%)
											</div>
										</div>
									</Tooltip>
								</div>
							)}
					</div>
					<div className={styles.amount}>
						<div className={styles.point_label}>
							<div className={styles.green_point} />
							<div className={styles.label}>
								Overdue
							</div>
						</div>
						{loading ? <Placeholder height="16px" width="100px" margin="4px 12px 0px 8px" />
							:						(
								<div className={styles.point_label}>
									<Tooltip
										content={getFormattedPrice(overDueAmount, 'INR')}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											INR
											{' '}
											{getAmountInLakhCrK(overDueAmount)}
											<div style={{ fontWeight: 500, fontSize: 13, marginTop: 2, marginLeft: 2 }}>
												{' '}
												(
												{overDuePercent}
												%)
											</div>
										</div>

									</Tooltip>
								</div>
							)}
					</div>

				</div>
				<div className={styles.progress_bar}>
					<ProgressLine
						currentPercent={currentPercent}
						todayDuePercent={todayDuePercent}
						overDuePercent={overDuePercent}
					/>
				</div>
			</div>

		</div>
	);
}

export default TotalPayables;
