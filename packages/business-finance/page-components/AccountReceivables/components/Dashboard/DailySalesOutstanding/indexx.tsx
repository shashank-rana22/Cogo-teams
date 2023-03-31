import { Tooltip, Toggle } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';

import styles from './styles.module.css';

interface Quater {
	quarter?: string,
	qsoForQuarter?: number,
	currency?: string
}

type DailySales = {
	currency?: string,
	dsoForTheMonth?: number,
	month?: string
} [];
interface DailySalesOutstandingProps {
	dailySalesOutstandingData?: DailySales,
	dailySalesOutstandingApiLoading?: boolean,
	quaterly?: Quater[],
	quaterlyLoading?: boolean
}

function DailySalesOutstanding({
	dailySalesOutstandingData,
	dailySalesOutstandingApiLoading, quaterly, quaterlyLoading,
}: DailySalesOutstandingProps) {
	const [active, setActive] = useState(false);

	const [graphActive, setGraphActive] = useState(false);

	const margin = {
		top    : 10,
		right  : 0,
		bottom : 30,
		left   : 80,
	};

	if (dailySalesOutstandingApiLoading || quaterlyLoading) {
		return (
			<div className={styles.dashboard_loader}>
				<div>
					<DashboardLoader />
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.container}>
				<div
					className={styles.sub_container}
				>
					<div
						className={styles.daily_sales}
					>
						<div className={styles.sales_container}>
							<div
								className={styles.styled_daily_text}
							>
								Daily Sales Outstanding
							</div>

							<Tooltip
								content={(
									<div>
										Calculation(Monthly):

										(open invoices - on
										{' '}
										<br />
										Account payments)/Total
										{' '}
										<br />
										{' '}
										Sales X No. of Days

									</div>
								)}
								placement="top"
							>
								<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
							</Tooltip>
						</div>
						<div className={styles.border} />
					</div>
					<div style={{ display: 'flex' }}>

						<Toggle
							name="quarter_toggle"
							size="md"
							offLabel="Quaterly View"
							onChange={() => setActive((p) => !p)}
							disabled={dailySalesOutstandingApiLoading || quaterlyLoading}
						/>

						<Toggle
							name="graph_toggle"
							size="md"
							offLabel="Graph View"
							onChange={() => setGraphActive((p) => !p)}
							disabled={dailySalesOutstandingApiLoading || quaterlyLoading}
						/>

					</div>
				</div>

				<div className={styles.bar_chart}>
					{(!active || graphActive) && (
						(quaterly).map((item, index) => (
							<div className={styles.price_container}>
								<div className={styles.amount}>
									{getFormattedPrice(
										item.qsoForQuarter,
										item.currency,
										{
											notation              : 'compact',
											compactDisplay        : 'short',
											maximumFractionDigits : 2,
											style                 : 'decimal',
										},
									)}
								</div>
								<div
									className={styles.quarter_container}
								>
									<div
										className={styles.quarter}
									>
										Q
										{index + 1}
									</div>
									<div>
										-
										{item.quarter}
									</div>
								</div>
							</div>
						)))}
				</div>

				{ graphActive && (
					<div className={styles.vertical_bar_graph}>
						<BarChart
							currencyType={dailySalesOutstandingData[0]?.currency || GLOBAL_CONSTANTS.currency_code.INR}
							margin={margin}
							data={dailySalesOutstandingData || []}
							dsoResponse
						/>
					</div>
				)}

			</div>
		</div>
	);
}

export default DailySalesOutstanding;
