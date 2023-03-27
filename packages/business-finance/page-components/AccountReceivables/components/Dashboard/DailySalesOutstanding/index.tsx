import { Tooltip, Toggle } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';

import styles from './styles.module.css';

function DailySalesOutstanding({
	dailySalesOutstandingData,
	dailySalesOutstandingApiLoading, quaterly, quaterlyLoading,
}) {
	const [active, setActive] = useState(false);

	const margin = {
		top    : 10,
		right  : 0,
		bottom : 30,
		left   : 80,
	};

	if (dailySalesOutstandingApiLoading || quaterlyLoading) {
		return (
			<div className={styles.container}>
				<DashboardLoader />
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
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div
								className={styles.styled_daily_text}
							>
								Daily Sales Outstanding
							</div>

							<Tooltip
								content="Calculation(Monthly) -> (open invoices - on
								 Account payments)/Total Sales X No. of Days"
								placement="top"
							>
								<div className={styles.icon}><IcMInfo /></div>
							</Tooltip>
						</div>
						<div className={styles.under_line} />
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>

						<Toggle
							name="quarter_toggle"
							size="md"
							offLabel="Quaterly View"
							onLabel="Graph View"
							onChange={() => setActive((p) => !p)}
							disabled={dailySalesOutstandingApiLoading || quaterlyLoading}
						/>

					</div>
				</div>

				<div style={{
					display        : 'flex',
					justifyContent : 'space-evenly',
				}}
				>
					{!active && (
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

				{ active && (

					<div className={styles.vertical_bar_graph}>

						<BarChart
							currencyType="INR"
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
