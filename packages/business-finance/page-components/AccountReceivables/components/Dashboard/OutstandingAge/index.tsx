import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';
import EmptyState from '../../../commons/EmptyStateDocs';

import styles from './styles.module.css';

interface OutsatndingProps {
	data?: object[],
	loading?: boolean
}
function OutstandingAge({ data, loading }: OutsatndingProps) {
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
			<div className={styles.bar_chart}>
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
					<div className={styles.styled_flex_age}>
						<div
							className={styles.styled_text_age}
						>
							By Age

						</div>
						<Tooltip
							content={(
								<div>
									Accounts receivables
									<br />
									according to the length
									<br />
									of an invoice has been
									<br />
									outstanding.
								</div>
							)}
							placement="top"
						>
							<div className={styles.icon}><IcMInfo height="18px" width="18px" /></div>
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
