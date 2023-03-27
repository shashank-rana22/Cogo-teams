import { Tooltip, Toggle } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';

import styles from './styles.module.css';

function DailySalesOutstanding({
	monthly, dailySalesOutstandingData,
	monthlyLoading, dailySalesOutstandingApiLoading, quaterly, quaterlyLoading,
}) {
	interface Props {
		quarterView?: string;
		graphView?: string;
	}
	const [params, onChangeParams] = useState<Props>({
		quarterView : 'normalView',
		graphView   : 'normalView',
	});

	const margin = {
		top    : 10,
		right  : 0,
		bottom : 30,
		left   : 80,
	};

	if (monthlyLoading || dailySalesOutstandingApiLoading || quaterlyLoading) {
		return (
			<div className={styles.container}>
				<DashboardLoader />
			</div>
		);
	}

	const marginTop = params.graphView === 'graphView' ? '0px' : '36px';
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
						<div className={styles.styled_text}>
							Quarter View
						</div>
						<div style={{ marginRight: '16px' }}>
							<Toggle
								name="quarter_toggle"
								size="md"
								value={params.quarterView}
								onChange={(e) => onChangeParams((pv:any) => ({
									...pv,
									quarterView: e?.target?.checked ? 'quarterView' : 'normalView',

								}))}
							/>
						</div>
						<div className={styles.styled_text}>
							Graph View
						</div>
						<div>
							<Toggle
								name="graph_toggle"
								size="md"
								value={params.graphView}
								onChange={(e) => onChangeParams((pv:any) => ({
									...pv,
									graphView: e?.target?.checked ? 'graphView' : pv.quarterView,

								}))}
							/>
						</div>
					</div>
				</div>

				<div style={{ marginTop }}>
					<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						{ params.quarterView === 'normalView' && params.graphView !== 'graphView' && (
							(monthly || {}).map((item) => (
								<div
									className={styles.price_container}
								>
									<div className={styles.amount}>
										{getFormattedPrice(
											item.amount,
											item.dashboardCurrency,
											{
												notation              : 'compact',
												compactDisplay        : 'short',
												maximumFractionDigits : 2,
												style                 : 'decimal',
											},
										)}
									</div>
									<div style={{ fontWeight: '500', fontSize: '16px' }}>
										{item.duration}
									</div>
								</div>
							)))}

						{params.quarterView === 'quarterView' && params.graphView !== 'graphView' && (
							(quaterly).map((item, index) => (
								<div className={styles.price_container}>
									<div className={styles.amount}>
										{getFormattedPrice(
											item.amount,
											item.dashboardCurrency,
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
											{item.duration}
										</div>
									</div>
								</div>
							)))}
					</div>
				</div>

				{ params.graphView === 'graphView' && (

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
