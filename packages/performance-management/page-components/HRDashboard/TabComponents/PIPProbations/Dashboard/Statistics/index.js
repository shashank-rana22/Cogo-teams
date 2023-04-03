import { ResponsiveBar } from '@cogoport/charts/bar';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import Filters from '../../../../../../common/Filters';

import getLogStatsData from './getLogStatsData';
import styles from './styles.module.css';
import useGetLogStats from './useGetLogStats';

function Statistics({ logType }) {
	const { logStatsLoading = false, statsData = {}, statsParams, setStatsParams } = useGetLogStats();
	const { pipStatsData, pipStatsKeys, probationStatsData, probationStatsKeys } = getLogStatsData(statsData);

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
							data={logType === 'pip' ? pipStatsData : probationStatsData}
							keys={logType === 'pip' ? pipStatsKeys : probationStatsKeys}
							indexBy="month"
							margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
							padding={0.5}
							innerPadding={2}
							groupMode="grouped"
							valueScale={{
								type: 'linear',
							}}
							colors={['#CFEAED', '#C4DC91', '#F37166']}
							axisTop={null}
							axisRight={null}
							axisBottom={{ tickSize: 0 }}
							axisLeft={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							enableGridY={false}
							borderRadius="6px"
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
