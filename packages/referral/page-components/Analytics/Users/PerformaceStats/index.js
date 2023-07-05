import { ResponsiveLine } from '@cogoport/charts/line';
import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import { TABS_OPTIONS } from '../../../../constants';
import useGetAdminStats from '../../../../hooks/useGetAdminStats';
import useGetReferralUserAnalytics from '../../../../hooks/useGetReferralUserAnalytics';
import NetworkStats from '../NetworkStats';

import styles from './styles.module.css';

const STATS_DATA_DEFAULT_COUNT = 0;

function PerformanceStats({ selectedDate = {} }) {
	const [filterType, setFilterType] = useState('invited');

	const { data, loading = false } = useGetReferralUserAnalytics({ filterType, selectedDate });
	const { count = {}, data: statsData = {} } = data || {};

	const { statsData: networkData = {}, statsLoading = false } = useGetAdminStats({ selectedDate });
	const { network_data = {} } = networkData || {};

	const newData = Object.keys(statsData || {}).map((item) => ({
		x: formatDate({
			date       : item,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
			formatType : 'date',
		}),
		y: statsData[item] || STATS_DATA_DEFAULT_COUNT,
	}));

	const graphData = [
		{
			id   : 'date',
			data : newData.reverse(),
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.tabs_container}>
					<Tabs
						activeTab={filterType}
						themeType="secondary-vertical"
						onChange={setFilterType}
					>
						{TABS_OPTIONS.map(({ label, name }) => (
							<TabPanel name={name} title={label} badge={count[name] || '0'} key={name} />
						))}

					</Tabs>
					{filterType && (
						<div className={styles.graph_div}>
							{loading ? (
								<Image
									src={GLOBAL_CONSTANTS.image_url.spinner_loader}
									width={50}
									height={50}
									alt="loader"
								/>
							) : (
								<ResponsiveLine
									data={graphData}
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
									axisTop={null}
									axisRight={null}
									axisBottom={{
										tickSize     : 5,
										tickPadding  : 5,
										tickRotation : 0,

									}}
									axisLeft={{
										tickSize     : 5,
										tickPadding  : 5,
										tickRotation : 0,

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
							)}
						</div>
					)}
				</div>
				<NetworkStats networkData={network_data} statsLoading={statsLoading} />
			</div>
		</div>
	);
}
export default PerformanceStats;
