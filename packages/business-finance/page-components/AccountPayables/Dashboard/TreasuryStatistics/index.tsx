import { Placeholder, Tooltip } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

import Filter from '../../../commons/Filters';
import useGetTreasuryStats from '../hooks/useGetTreasuryStats';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import { monthControls } from './monthControls';
import styles from './styles.module.css';

function TreasuryStatistics({ activeTab }) {
	const {
		data,
		filters,
		setFilters,
		loading,
	} = useGetTreasuryStats({ activeTab });

	console.log(data, 'datata');
	const {
		allocatedAmount,
		flushPercentage,
		noOfAccounts,
		processingPercentage,
		settledAmount,
		utilizedAmount,
	} = data || {};
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
					{loading ? <Placeholder height="20px" width="100px" margin="8px 12px 0px 0px" />
						: (
							<Tooltip content={getFormattedPrice(allocatedAmount, 'INR')} placement="top" interactive>
								<div className={styles.value}>
									INR
									{' '}
									{getAmountInLakhCrK(allocatedAmount)}
								</div>
							</Tooltip>
						)}
				</div>
				<div className={styles.vr} />
				<div className={styles.funds}>
					<div className={styles.label}>
						Utilized Amount
					</div>
					{loading ? <Placeholder height="20px" width="100px" margin="8px 12px 0px 0px" />
						: (
							<Tooltip content={getFormattedPrice(utilizedAmount, 'INR')} placement="top" interactive>
								<div className={styles.value}>
									INR
									{' '}
									{getAmountInLakhCrK(utilizedAmount)}
								</div>
							</Tooltip>
						)}
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Setteled Amount
					</div>
					{loading ? <Placeholder height="20px" width="100px" margin="8px 12px 0px 0px" />
						: (
							<Tooltip content={getFormattedPrice(settledAmount, 'INR')} placement="top" interactive>
								<div className={styles.value}>
									INR
									{' '}
									{getAmountInLakhCrK(settledAmount)}
								</div>
							</Tooltip>
						)}
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						UTR Pending Amount
					</div>
					{loading ? <Placeholder height="20px" width="100px" margin="8px 12px 0px 0px" />
						: (
							<Tooltip
								content={getFormattedPrice((utilizedAmount - settledAmount), 'INR')}
								placement="top"
								interactive
							>
								<div className={styles.value}>
									INR
									{' '}
									{getAmountInLakhCrK(utilizedAmount - settledAmount)}
								</div>
							</Tooltip>
						)}
				</div>
				<div className={styles.vr} />

				<div className={styles.funds}>
					<div className={styles.label}>
						Flush Percentege
					</div>
					{loading ? <Placeholder height="20px" width="100px" margin="8px 12px 0px 0px" />
						: (
							<div className={styles.value}>
								{flushPercentage?.toFixed(2)}
								{' '}
								%
							</div>
						)}
				</div>

				<div className={styles.funds}>
					<div className={styles.label}>
						Processing Percentege
					</div>
					{loading ? <Placeholder height="20px" width="100px" margin="8px 12px 0px 0px" />
						: (
							<div className={styles.value}>
								{processingPercentage?.toFixed(2)}
								{' '}
								%
							</div>
						)}
				</div>

			</div>
		</div>
	);
}

export default TreasuryStatistics;
