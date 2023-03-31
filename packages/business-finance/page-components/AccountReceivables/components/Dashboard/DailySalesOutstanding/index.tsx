import { Tooltip, Toggle } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';
import { months } from '../../../constants';

import styles from './styles.module.css';

function DailySalesOutstanding({
	dailySalesOutstandingData = [],
	dailySalesOutstandingApiLoading, quaterly, quaterlyLoading,
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

	const currentYear = new Date().getFullYear();

	if (dailySalesOutstandingApiLoading || quaterlyLoading) {
		return (
			<div className={styles.container}>
				<DashboardLoader />
			</div>
		);
	}

	const arrayMonths = [];

	const d = new Date();

	let newArray = [];

	let currentMonth1; let currentMonth2; let currentMonth3;

	if (d.getMonth() >= 2) {
		currentMonth1 = months[d.getMonth()];
		currentMonth2 = months[d.getMonth() - 1];
		currentMonth3 = months[d.getMonth() - 2];

		newArray = [currentMonth3, currentMonth2, currentMonth1];
	} else if (d.getMonth() === 1) {
		currentMonth1 = months[d.getMonth()];
		currentMonth2 = months[d.getMonth() - 1];
		newArray = [currentMonth2, currentMonth1];
	} else {
		currentMonth1 = months[d.getMonth()];
		newArray = [currentMonth1];
	}

	(dailySalesOutstandingData || []).forEach((element) => {
		if (newArray.includes(element?.month)) {
			arrayMonths.push(element);
		}
	});

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
							(arrayMonths || []).map((item) => (
								<div
									className={styles.price_container}
								>
									<div className={styles.amount}>
										{getFormattedPrice(
											item.dsoForTheMonth,
											item.currency,
											{
												notation              : 'compact',
												compactDisplay        : 'short',
												maximumFractionDigits : 2,
												style                 : 'decimal',
											},
										)}
									</div>
									<div style={{ fontWeight: '500', fontSize: '16px' }}>
										{item.month}
										{' '}
										-
										{' '}
										{currentYear}
									</div>
								</div>
							)))}

						{params.quarterView === 'quarterView' && params.graphView !== 'graphView' && (
							(quaterly).map((item, index) => (
								<div className={styles.price_container}>
									<div className={styles.amount}>
										{getFormattedPrice(
											item.qsoForQuarter || 0,
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
				</div>

				{ params.graphView === 'graphView' && (

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
