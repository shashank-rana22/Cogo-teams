import { ResponsiveLine } from '@cogoport/charts/line';
import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import { data } from '../../../configurations/dummyData';
import { TABS_OPTIONS } from '../../../constants';
import NetworkStats from '../NetworkStats';

import styles from './styles.module.css';

function PerformanceStats() {
	const [filterType, setFilterType] = useState('invited');

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.tabs_container}>
					<Tabs
						activeTab={filterType}
						themeType="secondary-vertical"
						onChange={setFilterType}
					>
						{TABS_OPTIONS.map(({ label, name, badge }) => (
							<TabPanel name={name} title={label} badge={badge} key={name} />
						))}

					</Tabs>
					{filterType && (
						<div className={styles.graph_div}>
							<ResponsiveLine
								data={data}
								margin={{ top: 30, right: 25, bottom: 40, left: 48 }}
								xScale={{ type: 'point' }}
								yScale={{
									type    : 'linear',
									min     : 'auto',
									max     : 'auto',
									stacked : true,
									reverse : false,
								}}
								yFormat=" >-.2f"
								curve="cardinal"
								axisTop={null}
								axisRight={null}
								axisBottom={{
									tickSize       : 5,
									tickPadding    : 5,
									tickRotation   : 0,
									// legend         : 'transportation',
									legendOffset   : 36,
									legendPosition : 'middle',
								}}
								axisLeft={{
									tickSize       : 5,
									tickPadding    : 5,
									tickRotation   : 0,
									// legend         : 'count',
									legendOffset   : -40,
									legendPosition : 'middle',
								}}
								enableGridX={false}
								enablePoints={false}
								pointSize={10}
								pointColor={{ theme: 'background' }}
								pointBorderWidth={2}
								pointBorderColor={{ from: 'serieColor' }}
								pointLabelYOffset={-12}
								useMesh
								legends={[]}
							/>
						</div>
					)}
					<NetworkStats />

				</div>
			</div>
		</div>
	);
}
export default PerformanceStats;
