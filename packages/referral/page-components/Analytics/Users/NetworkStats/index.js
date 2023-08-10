import { ResponsiveLine } from '@cogoport/charts/line';
import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import { formatData, getUserLevel } from '../../../../utils/network-stats-helper';

import styles from './styles.module.css';

const STATS_LOADING_COUNT = 6;

function NetworkStats({ networkData = {}, statsLoading = false }) {
	const networkLength = Object.keys(networkData).length;

	const network = formatData(networkData);

	const filteredNetwork = network.filter((item) => getUserLevel(networkLength).includes(item?.x));
	const newData = [
		{
			id   : 'network',
			data : filteredNetwork,
		},
	];

	if (isEmpty(networkData) && !statsLoading) {
		return (
			<div className={styles.container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_image}
					width={40}
					height={40}
					className={styles.empty_image}
					alt="empty"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Network</div>
			{statsLoading ? (
				[...Array(STATS_LOADING_COUNT).keys()].map((itm) => (
					<Placeholder className={styles.networks_skeleton} key={itm} />
				))
			) : (
				<div className={styles.graph_div}>
					<ResponsiveLine
						data={newData}
						colors={['#F9AE64']}
						margin={{ top: 12, right: 20, bottom: 55, left: 60 }}
						xScale={{ type: 'point' }}
						yScale={{
							type    : 'linear',
							min     : '0',
							max     : 'auto',
							stacked : false,
							reverse : false,
						}}
						axisTop={null}
						axisRight={null}
						axisBottom={{
							tickSize       : 0,
							tickPadding    : 10,
							tickRotation   : 0,
							legendOffset   : 36,
							legendPosition : 'middle',
						}}
						axisLeft={{
							tickSize       : 0,
							tickPadding    : 10,
							tickRotation   : 0,
							legend         : 'cogopoints',
							legendOffset   : -35,
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
					/>
				</div>
			)}
		</div>
	);
}

export default NetworkStats;
