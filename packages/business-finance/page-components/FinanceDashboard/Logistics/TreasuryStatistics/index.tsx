import { cl, Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo, IcCCountryIndia } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import getFormattedPrice from '../../../commons/utils/getFormattedPrice';
import useGetTreasuryStats from '../../hooks/getTreasuryData';
import showInTooltop from '../../utils/getOverFlowData';
import { treasuryControls } from '../controls';
import { getAmountInLakhCrK } from '../getAmountInLakhCrK';

import styles from './styles.module.css';

interface ItemProps {
	key?: string;
	label?: string;
	icon?: JSX.Element;
}
function TreasuryStatistics() {
	const [tabs, setTabs] = useState('all');
	const {
		data,
		treasuryFilters,
		loading,
		setTreasuryFilters,
	} = useGetTreasuryStats(tabs);

	const {
		allocatedAmount = 0, flushPercentage = 0, noOfAccounts = 0, processingPercentage = 0,
		settledAmount = 0, utilizedAmount = 0,
	} = data || {};
	const UTRPendingAmount = utilizedAmount - settledAmount;

	const tab = [
		{
			key   : 'all',
			label : 'ALL',
		},
		{
			key   : '101',
			label : 'Entity 101',
			icon  : <IcCCountryIndia height={15} width={15} />,

		},
		{
			key   : '301',
			label : 'Entity 301',
			icon  : <IcCCountryIndia height={15} width={15} />,

		},

	];
	return (
		<div>
			<div className={cl`${styles.card} ${styles.filter_button}`}>
				<div className={styles.main}>
					<div className={styles.filters_styles}>
						<div className={styles.text_filters_gap}>
							<div className={styles.text_style}>
								Treasury Statistics
								<div className={styles.border} />
							</div>
							<div className={styles.icon}>
								<Tooltip
									content={(
										<div className={styles.texts_styles}>
											Cash Outflow Allocation and
											<br />
											Utilisation Statistics
										</div>
									)}
									placement="right"
									caret={false}
								>
									<IcMInfo />
								</Tooltip>
							</div>
						</div>
						<div style={{ marginTop: '4px' }}>
							<Filter
								controls={treasuryControls}
								filters={treasuryFilters}
								setFilters={setTreasuryFilters}
							/>
						</div>
					</div>
					<div className={styles.container}>
						<div className={styles.flex}>
							{tab.map((item:ItemProps) => (
								<div
									key={item.key}
									onClick={() => {
										setTabs(item.key);
									}}
									role="presentation"
								>
									<div className={item.key === tabs
										? styles.sub_container_click : styles.sub_container}
									>
										{item.label}
										<div>{item.icon}</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.around_border}>
						{loading ? (
							<div style={{ alignItems: 'center', marginLeft: '10px' }}>
								<Placeholder height="20px" width="120px" />
							</div>
						) : (
							<div className={styles.text}>
								No. of Accounts -
								{' '}
								{noOfAccounts}
							</div>
						)}

						<div className={styles.border_left} />
						<div>
							Allocated Funds
							<div className={styles.amount_style}>
								{loading ? (
									<div style={{ alignItems: 'center' }}>
										<Placeholder height="20px" width="120px" />
									</div>
								) : (
									<>
										{showInTooltop(
											getFormattedPrice(allocatedAmount, 'INR'),
											getAmountInLakhCrK(allocatedAmount, 'INR'),
										)}
									</>
								)}
							</div>
						</div>
						<div className={styles.border_left} />
						<div className={styles.text_style_settled}>
							Utilized Funds
							<div className={styles.amount_style}>
								{loading ? (
									<div style={{ alignItems: 'center' }}>
										<Placeholder height="20px" width="120px" />
									</div>
								) : (
									<>
										{showInTooltop(
											getFormattedPrice(utilizedAmount, 'INR'),
											getAmountInLakhCrK(utilizedAmount, 'INR'),
										)}
									</>
								)}
							</div>
						</div>
						<div className={styles.text_style_settled}>
							Settled Amount
							<div className={styles.amount_style}>
								{loading ? (
									<div style={{ alignItems: 'center' }}>
										<Placeholder height="20px" width="120px" />
									</div>
								) : (
									<>
										{showInTooltop(
											getFormattedPrice(settledAmount, 'INR'),
											getAmountInLakhCrK(settledAmount, 'INR'),
										)}
									</>
								)}
							</div>
						</div>
						<div className={styles.text_styles}>
							UTR Pending Amount
							<div className={styles.amount_style}>
								{loading ? (
									<div style={{ alignItems: 'center' }}>
										<Placeholder height="20px" width="120px" />
									</div>
								) : (
									<>
										{showInTooltop(
											getFormattedPrice(UTRPendingAmount, 'INR'),
											getAmountInLakhCrK(UTRPendingAmount, 'INR'),
										)}
									</>
								)}

							</div>
						</div>
						<div className={styles.border_left} />
						<div className={styles.text_style_settled}>
							Flush Percentage
							{loading ? (
								<div style={{ alignItems: 'center' }}>
									<Placeholder height="20px" width="120px" />
								</div>
							) : (

								<div className={styles.amount_style}>
									{flushPercentage.toFixed(2)}
									%
								</div>
							)}
						</div>
						<div className={styles.text_styles}>
							Processing Percentage
							{loading ? (
								<div style={{ alignItems: 'center' }}>
									<Placeholder height="20px" width="120px" />
								</div>
							) : (
								<div className={styles.amount_style}>
									{processingPercentage.toFixed(2)}
									%
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TreasuryStatistics;
