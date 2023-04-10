import { ResponsiveBar } from '@cogoport/charts/bar';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';
import Filters from '../Filters';

import getLogStatsData from './getLogStatsData';
import styles from './styles.module.css';
import useGetLogStats from './useGetLogStats';

function Statistics({ logType }) {
	const { logStatsLoading = false, statsData = [], statsParams, setStatsParams } = useGetLogStats(logType);
	const { chartData = [], chartKeys } = getLogStatsData({ statsData });

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<Filters
					params={statsParams}
					setParams={setStatsParams}
					source="hr_pip_stats"
				/>
			</div>

			<div className={styles.chart_section}>

				<div className={styles.chart}>
					<div className={styles.chart_header}>{`${logType === 'pip' ? 'PIP' : 'Probation'} Statistics`}</div>
					{!logStatsLoading && isEmpty(statsData) ? (
						<EmptyState
							height={140}
							width={220}
							emptyText="PIP Statistics Not Found"
							textSize="12px"
							flexDirection="column"
						/>
					) : (
						<ResponsiveBar
							data={chartData}
							keys={chartKeys}
							indexBy="month"
							margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
							padding={0.9}
							innerPadding={0}
							groupMode="stacked"
							valueScale={{
								type: 'linear',
							}}
							colors={['#C4DC91', (logType === 'pip' ? '#F37166' : '#FBE39F')]}
							axisTop={null}
							axisRight={null}
							axisBottom={{ tickSize: 0 }}
							axisLeft={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							enableGridY={false}
							legends={[
								{
									dataFrom      : 'keys',
									anchor        : 'right',
									direction     : 'column',
									justify       : false,
									translateX    : 120,
									translateY    : 0,
									itemsSpacing  : 2,
									itemWidth     : 100,
									itemHeight    : 20,
									itemDirection : 'left-to-right',
									itemOpacity   : 0.85,
									symbolSize    : 10,
									effects       : [
										{
											on    : 'hover',
											style : {
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
					)}
				</div>
			</div>

		</div>
	);
}

export default Statistics;
