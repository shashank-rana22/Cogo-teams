import { Tabs, TabPanel, Tooltip } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import useGetTreasuryStats from '../hooks/useGetTreasuryStats';
import { getAmountInLakhCrK } from '../utils/getAmountInLakhCrK';

import Entity from './Entity';
import { monthControls } from './monthControls';
import styles from './styles.module.css';

function TreasuryStatistics() {
	// const [monthFilter, setMonthFilter] = useState({ month: '' });
	const [activeTab, setActiveTab] = useState(null);
	const {
		data,
		filters,
		setFilters,
	} = useGetTreasuryStats({ activeTab });

	console.log(data, 'datata');
	const {
		allocatedAmount,
		// flush,
		flushPercentage,
		noOfAccounts,
		// processingAmount,
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
					<Tooltip placement="top" content="jaiprakash">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<Filter controls={monthControls} filters={filters} setFilters={setFilters} />
				</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="ALL" title={<Entity entityCode="all" />}>
						{/* <div>This is local search</div> */}
					</TabPanel>

					<TabPanel name="101" title={<Entity entityCode="101" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
					<TabPanel name="201" title={<Entity entityCode="201" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
					<TabPanel name="301" title={<Entity entityCode="301" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
					<TabPanel name="401" title={<Entity entityCode="401" />}>
						{/* <div>This is suggested</div> */}
					</TabPanel>
				</Tabs>
			</div>
			<div className={styles.funds_container}>
				<div className={styles.account}>
					<div className={styles.label_no}>
						No. of Accounts -
						{' '}
						{noOfAccounts}
					</div>
					<div className={styles.vr} />
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Allocated Amount
					</div>
					<Tooltip content={getFormattedPrice(allocatedAmount, 'INR')} placement="top" interactive>
						<div className={styles.value}>
							INR
							{' '}
							{getAmountInLakhCrK(allocatedAmount)}
						</div>
					</Tooltip>
				</div>
				<div className={styles.vr} />
				<div className={styles.funds}>
					<div className={styles.label}>
						Utilized Amount
					</div>
					<Tooltip content={getFormattedPrice(utilizedAmount, 'INR')} placement="top" interactive>
						<div className={styles.value}>
							INR
							{' '}
							{getAmountInLakhCrK(utilizedAmount)}
						</div>
					</Tooltip>
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						Setteled Amount
					</div>
					<Tooltip content={getFormattedPrice(settledAmount, 'INR')} placement="top" interactive>
						<div className={styles.value}>
							INR
							{' '}
							{getAmountInLakhCrK(settledAmount)}
						</div>
					</Tooltip>
				</div>
				<div className={styles.funds}>
					<div className={styles.label}>
						UTR Pending Amount
					</div>
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
				</div>
				<div className={styles.vr} />

				<div className={styles.funds}>
					<div className={styles.label}>
						Flush Percentege
					</div>
					<div className={styles.value}>
						{flushPercentage?.toFixed(2)}
						{' '}
						%
					</div>
				</div>

				<div className={styles.funds}>
					<div className={styles.label}>
						Processing Percentege
					</div>
					<div className={styles.value}>
						{processingPercentage?.toFixed(2)}
						{' '}
						%
					</div>
				</div>

			</div>
		</div>
	);
}

export default TreasuryStatistics;
