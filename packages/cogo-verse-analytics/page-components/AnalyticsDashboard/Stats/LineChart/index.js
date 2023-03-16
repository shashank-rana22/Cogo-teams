/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';

import { imgURL } from '../../../../constants/image-urls';

import styles from './styles.module.css';

function Charts({ GraphData = [], hideChart = false }) {
	const colors = ['#5B4A99', '#BDBDBD'];

	const formattedDate = (date) => format(date, 'dd MMM');

	const formattedTime = (time) => {
		if (time >= 60) {
			return `${Number(time / 60).toFixed(1)} hrs`;
		}
		return `${time} min`;
	};

	return (
		<div style={{ height: '100%' }}>
			{!hideChart ? (
				<ResponsiveLine
					data={GraphData}
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
					colors={colors}
					axisBottom={{
            	orient         : 'bottom',
            	tickSize       : 0,
            	tickPadding    : 25,
            	tickValues     : 8,
            	tickRotation   : 0,
            	legend         : '',
            	legendOffset   : 45,
            	legendPosition : 'middle',
            	format         : (v) => formattedDate(v),
					}}
					axisLeft={{
            	orient         : 'left',
            	tickSize       : 0,
            	tickValues     : 5,
            	tickPadding    : 15,
            	tickRotation   : 0,
            	legend         : '',
            	legendOffset   : -40,
            	legendPosition : 'middle',
            	format         : (v) => formattedTime(v),
					}}
					tooltip={({ point = {} }) => {
            	const { borderColor, data } = point;

            	return (
	<div className={styles.tool_tip}>
		<span style={{ background: borderColor }} />
		<strong>
			{formattedDate(data.x)}
			{' '}
			:
			{' '}
			{formattedTime(data.y)}
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
