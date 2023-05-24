import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';

import { imgURL } from '../../../../constants/image-urls';

import styles from './styles.module.css';

function Charts({ GraphData = [], hideChart = false }) {
	const dates = GraphData.map((data) => data?.shipment_week_starting_from);
	const cancelledShipments = GraphData.map((data) => data?.cogoverse_cancelled_shipments);
	const activeShipments = GraphData.map((data) => data?.cogoverse_active_shipments);
	const totalShipments = GraphData.map((data) => data?.total_shipments);

	const colors = ['#bf291e', '#d6b300', '#6fa5ab'];
	const cancelled_data = dates.map((date, index) => ({
		x : format(date, 'dd MMM'),
		y :	cancelledShipments[index],
	}));
	const active_data = dates.map((date, index) => ({
		x : format(date, 'dd MMM'),
		y :	activeShipments[index],
	}));
	const total_data = dates.map((date, index) => ({
		x : format(date, 'dd MMM'),
		y :	totalShipments[index],
	}));

	const graphData = [
		{
			id   : 'cogoverse_cancelled_shipments',
			data : cancelled_data,
		},
		{
			id   : 'cogoverse_active_shipments',
			data : active_data,
		},
		{
			id   : 'cogoverse_total_shipments',
			data : total_data,
		},

	];

	return (
		<div style={{ height: '100%' }}>
			{!hideChart ? (
				<ResponsiveLine
					data={graphData}
					margin={{ top: 15, right: 35, bottom: 75, left: 75 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 0,
						max     : 'auto',
						reverse : false,
					}}
					yFormat=" >-.2f"
					curve="natural"
					axisTop={null}
					axisRight={null}
					colors={colors}
					axisBottom={{
						orient         : 'bottom',
						tickSize       : 0,
						tickPadding    : 15,
						tickValues     : 8,
						tickRotation   : 0,
						legend         : 'Date',
						legendOffset   : 50,
						legendPosition : 'middle',
					}}
					axisLeft={{
						orient         : 'left',
						tickSize       : 0,
						tickValues     : 5,
						tickPadding    : 12,
						tickRotation   : 0,
						legend         : 'Shipments',
						legendOffset   : -50,
						legendPosition : 'middle',
					}}
					tooltip={({ point = {} }) => {
						const { borderColor, data } = point;
						return (
							<div className={styles.tool_tip}>
								<span style={{ background: borderColor }} />
								<strong>
									{(data.x)}

									{' '}
									:
									{' '}
									{(data.y)}
								</strong>
							</div>
						);
					}}
					enableGridX={false}
					enablePoints={false}
					pointSize={10}
					pointColor={{ theme: 'background' }}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-12}
					crosshairType="bottom"
					useMesh
					legends={[]}
				/>
			) : (
				<div className={styles.empty_state}>
					<div className={styles.empty_image_container}>
						<img
							src={imgURL.empty_2}
							alt="Empty State"
							className={styles.empty_state_icon}
							width="135px"
						/>
					</div>
					<div className={styles.horizontal_line} />
					<div className={styles.horizontal_line} />
					<div className={styles.horizontal_line} />
					<div className={styles.horizontal_line} />
					<div className={styles.horizontal_line} />

				</div>
			)}
		</div>
	);
}

export default Charts;
