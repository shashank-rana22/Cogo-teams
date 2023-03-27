import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import EmptyState from '../../../../commons/EmptyStateDocs';
import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';

import styles from './styles.module.css';

function OutstandingAge({ data, loading }) {
	const outstandingData = Object.keys(data).map((key) => data[key]);

	const { dashboardCurrency = '' } = outstandingData[0] || {};
	const collectiveAmount = [];
	let durationRange = null;

	(outstandingData || [{}]).forEach(({ ageingDuration, amount = 0 }) => {
		if (durationRange === ageingDuration) {
			const totalAmount =	collectiveAmount[collectiveAmount.length - 1].value + amount;
			collectiveAmount[collectiveAmount.length - 1] = {
				id    : ageingDuration,
				value : totalAmount,
			};
		} else {
			collectiveAmount.push({
				id    : ageingDuration,
				value : amount,
			});
			durationRange = ageingDuration;
		}
	});

	const margin = {
		top    : 10,
		right  : 0,
		bottom : 30,
		left   : 0,
	};

	const properData = collectiveAmount;

	const isEmpty = (properData || []).every((x) => x.value === 0);

	function BarData() {
		if (isEmpty) {
			return (
				<div className={styles.no_data_found_icon}>
					<EmptyState />
				</div>
			);
		}
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div className={styles.vertical_bar_graph}>
					<BarChart
						currencyType={dashboardCurrency}
						margin={margin}
						data={properData || []}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.styled_container}>
				<div
					className={styles.outstanding}
				>
					<div
						className={styles.styled_text}
					>
						Outstanding
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<div
							className={styles.styled_text_age}
						>
							By Age

						</div>
						<Tooltip
							content="Accounts receivables according to the length
						 of an invoice has been outstanding."
							placement="top"
						>
							<div className={styles.icon}><IcMInfo /></div>
						</Tooltip>

					</div>
				</div>

			</div>

			{loading ? (
				<div
					className={styles.dashboard}
				>
					<DashboardLoader />
				</div>
			) : BarData()}

		</div>
	);
}

export default OutstandingAge;
