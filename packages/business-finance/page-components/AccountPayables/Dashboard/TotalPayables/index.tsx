import { Placeholder, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import useGetTotalPayables from '../hooks/useGetTotalPayables';

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
										content={formatAmount({
											amount  : currentAmount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											{' '}
											{formatAmount({
												amount  : currentAmount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
												},
											})}
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
										content={
											formatAmount({
												amount  : todayDueAmount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
												},
											})
										}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											{' '}
											{formatAmount({
												amount  : todayDueAmount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
													compactDisplay  : 'short',
												},
											})}
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
										content={
											formatAmount({
												amount  : overDueAmount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
												},
											})
										}
										placement="top"
										interactive
									>
										<div className={styles.value}>
											{' '}
											{formatAmount({
												amount  : overDueAmount,
												currency,
												options : {
													currencyDisplay : 'code',
													style           : 'currency',
													notation        : 'compact',
													compactDisplay  : 'short',
												},
											})}
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
