import { ResponsiveHeatMap } from '@cogoport/charts/heatmap';
import { cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import getFormattedData from '../../../utils/getFormattedData';
import { handleValues } from '../../../utils/handleValue';

import styles from './styles.module.css';

function MyResponsiveScatterPlot({ setSingleData = () => {}, simulationData = {} }) {
	const formattedData = getFormattedData(simulationData);

	const mapData = (data) => {
		const details = Object.entries(data).map(([key, value]) => ({
			id   : key,
			data : Object.entries(value).map(([childKey, childValue]) => ({
				x : handleValues(childKey),
				y : handleValues(childValue),
			})),

		}));

		return details;
	};

	const finalData = mapData(formattedData);

	return (
		<div className={styles.container}>
			<ResponsiveHeatMap
				data={finalData.reverse()}
				margin={{ top: 30, right: 20, bottom: 80, left: 70 }}
				valueFormat=">-.2s"
				xOuterPadding={0.05}
				yOuterPadding={0.05}
				axisTop={null}
				axisBottom={{
					tickSize       : 0,
					tickPadding    : 6,
					tickRotation   : 0,
					legend         : 'Shipment Revenue (INR)',
					legendPosition : 'start',
					legendOffset   : 34,
				}}
				axisLeft={{
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					legend         : 'Network Levels',
					legendPosition : 'start',
					legendOffset   : -52,
				}}
				colors={{
					type      : 'diverging',
					scheme    : 'red_yellow_blue',
					divergeAt : 0.5,
					minValue  : -100000,
					maxValue  : 100000,
				}}
				activeOpacity={0.4}
				inactiveOpacity={0.8}
				onClick={(item) => setSingleData({ item })}
			/>
			<div className={styles.direction_container}>
				<div className={cl`${styles.arrow} ${styles.right_arrow}`}>
					<IcMArrowNext />
				</div>
				<div className={cl`${styles.arrow} ${styles.left_arrow}`}>
					<IcMArrowNext />
				</div>
			</div>
		</div>
	);
}

export default MyResponsiveScatterPlot;
