import { ResponsiveHeatMap } from '@cogoport/charts/heatmap';
import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMArrowNext } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getFormattedData from '../../../utils/getFormattedData';
import { handleValues } from '../../../utils/handleValue';

import styles from './styles.module.css';

function MyResponsiveScatterPlot({ setSingleData = () => {}, simulationData = {}, activeTab = '' }) {
	const geo = getGeoConstants();
	const currencyCode = geo.country.currency.code;

	const formattedData = getFormattedData(simulationData);

	const mapData = (data) => {
		const details = Object.entries(data).map(([key, value]) => ({
			id   : key,
			data : Object.entries(value).map(([childKey, childValue]) => ({
				x     : handleValues(childKey),
				y     : childValue,
				color : '#fff',
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
					legend         : `${startCase(activeTab)} Revenue (${currencyCode}`,
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
				colors={(d) => d.data.color}
				activeOpacity={0.4}
				inactiveOpacity={0.8}
				borderWidth={1}
				borderColor={{ theme: 'grid.line.stroke' }}
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
