import { ResponsivePie } from '@cogoport/charts/pie';
import { IcMUpwardGraph } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import useChartStats from '../../../../hooks/useChartStats';

import { getStatsData } from './get-stats-data';
import styles from './styles.module.css';

function Statistics({ activeTab, filters }) {
	const { t } = useTranslation(['allocation']);

	const {
		stats = {},
		loading,
		isEmpty = false,
	} = useChartStats({ activeTab, filters });

	const statsControl = getStatsData({ stats, t })[activeTab] || {};

	if (isEmpty && !loading) {
		return (
			<section className={styles.container}>
				<div className={styles.empty_text}>
					<IcMUpwardGraph width={100} height={100} style={{ marginBottom: '16px' }} />
					{t('allocation:statistics_empty_state')}
				</div>
			</section>
		);
	}

	return (
		<section className={styles.container}>
			{Object.values(statsControl).map((chartData) => (
				<div key={chartData.title} className={styles.chart_container}>
					<div className={styles.chart_title}>{chartData.title}</div>

					<div className={styles.single_chart_container}>
						<ResponsivePie
							loading={loading}
							data={chartData?.data}
							innerRadius={0}
							activeOuterRadiusOffset={4}
							enableArcLinkLabels={false}
							enableArcLabels={false}
							colors={chartData.colors}
							colorBy="index"
							margin={{ top: 20, right: 10, bottom: 10, left: 150 }}
							legends={[
								{
									anchor        : 'left',
									direction     : 'column',
									justify       : false,
									translateX    : -120,
									translateY    : 0,
									itemsSpacing  : 5,
									itemHeight    : 20,
									itemDirection : 'left-to-right',
									symbolSize    : 12,
									symbolShape   : 'circle',
								},
							]}
							tooltip={({
								datum: { label = '', value = '' },
							}) => (
								<div className={styles.pie_tooltip}>
									<strong>
										{label}
										:
										{' '}
										{value}
									</strong>
								</div>
							)}
						/>
					</div>
				</div>
			))}
		</section>
	);
}

export default Statistics;
