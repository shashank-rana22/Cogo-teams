import { IcCCogoCoin } from '@cogoport/icons-react';
import React from 'react';

import DetailsPieCharts from '../../../../common/DetailsPieCharts';
import cogopointsMapping from '../../../../configurations/cogopoints-mapping';
import pieChartMapping from '../../../../configurations/pie-chart-mapping';

import ReferralPercentage from './ReferralPercentage';
import ReferralTypes from './ReferralTypes';
import styles from './styles.module.css';

function Cogopoints() {
	const { detailsPieChart } = pieChartMapping();
	const { bonusPoints } = cogopointsMapping();

	return (
		<>
			<div className={styles.header}>
				<div className={styles.title}>
					COGOPOINTS
				</div>
				<div className={styles.referral_types}>
					<ReferralTypes />
				</div>
			</div>
			<div className={styles.chart_container}>
				{detailsPieChart.map(({ title, data, total_count }) => (
					<div className={styles.charts}>
						<ReferralPercentage data={data} />
						<DetailsPieCharts
							title={title}
							data={data}
							totalCount={total_count}
						/>
					</div>
				))}

				<div className={styles.bonus_container}>
					{bonusPoints.map(({ title, points }) => (
						<div className={styles.view}>
							<div className={styles.count_container}>
								<IcCCogoCoin className={styles.coin_icon} />
								<div className={styles.number}>{ points}</div>
							</div>

							<div className={styles.sub_text}>{title}</div>
						</div>
					))}

				</div>
			</div>
		</>
	);
}

export default Cogopoints;
