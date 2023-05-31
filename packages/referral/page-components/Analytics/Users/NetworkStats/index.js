import { ResponsiveLine } from '@cogoport/charts/line';
import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import { FIRST_LEVEL_DATA, SECOUND_LEVEL_DATA, THIRD_LEVEL_DATA } from '../../../../constants';
import { handleValues } from '../../../../utils/handleValue';

import styles from './styles.module.css';

function NetworkStats({ network_data = {}, statsLoading = false }) {
	const networkLength = Object.keys(network_data).length;

	const getUserLevel = () => {
		let userLevel = [];
		if (networkLength <= 10) {
			userLevel = FIRST_LEVEL_DATA;
		} else if (networkLength <= 20) {
			userLevel = SECOUND_LEVEL_DATA;
		} else {
			userLevel = THIRD_LEVEL_DATA;
		}
		return userLevel;
	};

	const mapdata = (data) => {
		const keys = Object.keys(data || {});
		let details = [];
		keys.forEach((key, index) => {
			details = [
				...details,
				{
					x : `L${index + 1}`,
					y : handleValues(data?.[key]),
				},
			];
		});
		return details;
	};

	const network = mapdata(network_data);

	const filteredNetwork = network.filter((item) => getUserLevel().includes(item?.x));
	const newData = [
		{
			id   : 'network',
			data : filteredNetwork,
		},
	];

	if (isEmpty(network_data) && !statsLoading) {
		return (
			<div className={styles.container}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_image}
					width={40}
					height={40}
					className={styles.empty_image}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Network</div>
			{statsLoading ? (
				[...Array(6)].map((itm) => (
					<Placeholder className={styles.networks_skeleton} key={itm} />
				))
			) : (
				<div className={styles.graph_div}>

					<ResponsiveLine
						data={newData}
						width={385}
						height={195}
						colors={['#F9AE64']}
						margin={{ top: 12, right: 20, bottom: 55, left: 50 }}
						xScale={{ type: 'point' }}
						yScale={{
							type    : 'linear',
							min     : 'auto',
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
							tickValues     : 5,
							tickRotation   : 0,
							legend         : 'cogopoints',
							legendOffset   : -45,
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
