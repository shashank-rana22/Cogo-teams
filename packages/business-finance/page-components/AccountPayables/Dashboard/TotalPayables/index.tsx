import { Placeholder, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import useGetTotalPayables from '../hooks/useGetTotalPayables';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import ProgressLine from './ProgressLine';
import styles from './styles.module.css';

interface FilterProps {
	currency?: string,
	service?: string,
}
interface ItemProps {
	filtersData: FilterProps;
	activeEntity:string,
}

function TotalPayables({
	filtersData,
	activeEntity,
}:ItemProps) {
	const { data, loading } = useGetTotalPayables({ filtersData, activeEntity });

	const {
		currentAmount,
		currentPercent,
		overDueAmount,
		overDuePercent,
		todayDueAmount,
		todayDuePercent,
		currency,
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
						{loading ? <Placeholder className={styles.loader} />
							: (
								<div className={styles.point_label}>
									<Tooltip
										content={getFormattedPrice(currentAmount, currency)}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											{currency}
											{' '}
											{getAmountInLakhCrK(currentAmount)}
											<div className={styles.inline_style}>
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
						{loading ? <Placeholder className={styles.loader} />
							:						(
								<div className={styles.point_label}>
									<Tooltip
										content={getFormattedPrice(todayDueAmount, currency)}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											{currency}
											{' '}
											{getAmountInLakhCrK(todayDueAmount)}
											<div className={styles.inline_style}>
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
						{loading ? <Placeholder className={styles.loader} />
							:						(
								<div className={styles.point_label}>
									<Tooltip
										content={getFormattedPrice(overDueAmount, currency)}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											{currency}
											{' '}
											{getAmountInLakhCrK(overDueAmount)}
											<div className={styles.inline_style}>
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
