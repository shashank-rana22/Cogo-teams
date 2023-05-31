import { Placeholder, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import Filter from '../../../commons/Filters';
import useGetTreasuryStats from '../hooks/useGetTreasuryStats';

import { monthControls } from './monthControls';
import styles from './styles.module.css';

interface ItemProps {
	activeEntity:string,
}
function TreasuryStatistics({ activeEntity }:ItemProps) {
	const {
		data,
		filters,
		setFilters,
		loading,
	} = useGetTreasuryStats({ activeEntity });

	const {
		allocatedAmount,
		flushPercentage,
		noOfAccounts,
		processingPercentage,
		settledAmount,
		utilizedAmount,
		currency,
	} = data || {};

	const TREASURY_MAP = [
		{
			amount : utilizedAmount,
			label  : 'Utilized Amount',
		},
		{
			amount : settledAmount,
			label  : 'Setteled Amount',
		},
		{
			amount : (utilizedAmount - settledAmount),
			label  : 'UTR Pending Amount',
		},
	];
	const TREASURY_PERCENTAGE = [
		{
			label      : 'Flush Percentege',
			percentage : flushPercentage?.toFixed(2),
		},
		{
			label      : 'Processing Percentege',
			percentage : processingPercentage?.toFixed(2),
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Treasury Statistics
						<div className={styles.hr} />
					</div>
				</div>
				<div className={styles.segmented_filter}>
					<Filter controls={monthControls} filters={filters} setFilters={setFilters} />
				</div>
			</div>
			<div className={styles.funds_container}>
				<div className={styles.account}>

					<div className={styles.label_no}>
						No. of Accounts -
						{' '}
						{loading ? (
							<Placeholder
								height="16px"
								width="20px"
								margin="4px 12px 0px 10px"
							/>
						) : noOfAccounts}
					</div>

					<div className={styles.vr} />
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Allocated Amount
					</div>
					{loading ? <Placeholder className={styles.loader} />
						: (
							<Tooltip
								content={
								formatAmount({
									amount  : allocatedAmount,
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
										amount  : allocatedAmount,
										currency,
										options : {
											currencyDisplay : 'code',
											style           : 'currency',
											notation        : 'compact',
											compactDisplay  : 'short',

										},
									})}
								</div>
							</Tooltip>
						)}
				</div>
				<div className={styles.vr} />
				{TREASURY_MAP.map((item) => (
					<div className={styles.funds} key={item.label}>
						<div className={styles.label}>
							{item?.label}
						</div>
						{loading ? <Placeholder className={styles.loader} />
							: (
								<Tooltip
									content={
									formatAmount({
										amount  : item.amount,
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
											amount  : item?.amount,
											currency,
											options : {
												currencyDisplay : 'code',
												style           : 'currency',
												notation        : 'compact',
												compactDisplay  : 'short',

											},
										})}
									</div>
								</Tooltip>
							)}
					</div>
				))}

				<div className={styles.vr} />

				{TREASURY_PERCENTAGE?.map((item) => (
					<div className={styles.funds} key={item.label}>
						<div className={styles.label}>
							{item?.label}
						</div>
						{loading ? <Placeholder className={styles.loader} />
							: (
								<div className={styles.value}>
									{item?.percentage}
									{' '}
									%
								</div>
							)}
					</div>
				))}

			</div>
		</div>
	);
}

export default TreasuryStatistics;
