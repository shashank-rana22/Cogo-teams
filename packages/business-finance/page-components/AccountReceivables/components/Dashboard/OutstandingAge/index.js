import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import BarChart from '../../../commons/BarChart';
import DashboardLoader from '../../../commons/DashboardLoader';
import EmptyState from '../../../commons/EmptyStateDocs';

import styles from './styles.module.css';

const MARGIN = {
	top    : 10,
	right  : 0,
	bottom : 30,
	left   : 0,
};

function OutstandingAge({ data, loading }) {
	const { t = () => '' } = useTranslation(['accountRecievables']);

	const outstandingData = Object.keys(data).map((key) => data[key]);

	const { dashboardCurrency = '' } = outstandingData[0] || {};
	const COLLECTIVE_AMOUNT = [];
	let durationRange = null;

	(outstandingData || [{}]).forEach(({ ageingDuration, amount = 0 }) => {
		if (durationRange === ageingDuration) {
			const totalAmount =	COLLECTIVE_AMOUNT[COLLECTIVE_AMOUNT.length - 1].value + amount;
			COLLECTIVE_AMOUNT[COLLECTIVE_AMOUNT.length - 1] = {
				id    : ageingDuration,
				value : totalAmount,
			};
		} else {
			COLLECTIVE_AMOUNT.push({
				id    : ageingDuration,
				value : amount,
			});
			durationRange = ageingDuration;
		}
	});

	const properData = COLLECTIVE_AMOUNT;

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
						margin={MARGIN}
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
						{t('outstanding_by_age')}
					</div>
					<div className={styles.styled_flex_age}>
						<Tooltip
							content={(
								<div className={styles.tooltip}>
									{t('outstanding_by_age_tooltip')}
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
