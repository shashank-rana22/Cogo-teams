import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';

import { imgURL } from '../../../../constants/image-urls';

import styles from './styles.module.css';

function Charts({ GraphData = [], hideChart = false }) {
	const Dates = GraphData.map((data) => data?.shipment_week_starting_from);
	const CancelledShipments = GraphData.map((data) => data?.cogoverse_cancelled_shipments);
	const ActiveShipments = GraphData.map((data) => data?.cogoverse_active_shipments);
	const totalShipments = GraphData.map((data) => data?.total_shipments);

	const cancelled_data = Dates.map((date, index) => ({
		x : format(date, 'dd MMM'),
		y :	CancelledShipments[index],
	}));
	const active_data = Dates.map((date, index) => ({
		x : format(date, 'dd MMM'),
		y :	ActiveShipments[index],
	}));
	const total_data = Dates.map((date, index) => ({
		x : format(date, 'dd MMM'),
		y :	totalShipments[index],
	}));

	const graphData = [
		{
			id    : 'cogoverse_cancelled_shipments',
			color : 'hsl(27, 70%, 50%)',
			data  : cancelled_data,
		},
		{
			id    : 'cogoverse_active_shipments',
			color : 'hsl(47, 70%, 50%)',
			data  : active_data,
		},
		{
			id    : 'cogoverse_total_shipments',
			color : 'hsl(57, 70%, 50%)',
			data  : total_data,
		},

	];

	return (
		<div style={{ height: '100%' }}>
			{!hideChart ? (
				<ResponsiveLine
					data={graphData}
					margin={{ top: 5, right: 35, bottom: 55, left: 75 }}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 'auto',
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
					yFormat=" >-.2f"
					curve="natural"
					axisTop={null}
					axisRight={null}
					axisBottom={{
            	orient         : 'bottom',
            	tickSize       : 0,
            	tickPadding    : 10,
            	tickValues     : 8,
            	tickRotation   : 0,
            	legend         : 'Date',
            	legendOffset   : 40,
            	legendPosition : 'middle',
					}}
					axisLeft={{
            	orient         : 'left',
            	tickSize       : 0,
            	tickValues     : 5,
            	tickPadding    : 15,
            	tickRotation   : 0,
            	legend         : 'Shipments',
            	legendOffset   : -50,
            	legendPosition : 'middle',
					}}
					tooltip={({ point = {} }) => {
            	const { borderColor, data, label } = point;

            	return (
	<div className={styles.tool_tip}>
		<span style={{ background: borderColor }} />
		<strong>
			{data.y}
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
