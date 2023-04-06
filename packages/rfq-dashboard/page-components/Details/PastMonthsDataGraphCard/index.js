import { ResponsiveLine } from '@cogoport/charts/line';
import { IcCFtick } from '@cogoport/icons-react';

import { graphPastMonthData } from '../../../configurations/past-months-graph-data';

import styles from './styles.module.css';

function GraphDataCard() {
	const LegendsData = [
		{
			label: '100 Shipment Booked',
		},
		{
			label: '20 Contracts',
		},
		{
			label: '1000 Container Booked',
		},
		{
			label: 'Revenue',
		},
		{
			label: 'Profit %',
		},
	];

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Past 12 Months Data</div>
			<div className={styles.graph_container}>
				<ResponsiveLine
					width={340}
					height={120}
					data={graphPastMonthData}
				// colors={#FFEBAD}
					margin={{ top: 15, right: 20, bottom: 25, left: 25 }}
					xScale={{ type: 'point' }}
					yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
					yFormat=" >-.2f"
					axisTop={null}
					axisRight={null}
				// axisBottom={{
				//     orient: 'bottom',
				//     tickSize: 0,
				//     tickPadding: 0,
				//     tickRotation: 0,
				//     legend: 'transportation',
				//     legendOffset: 36,
				//     legendPosition: 'middle'
				// }}
				// axisLeft={{
				//     orient: 'left',
				//     tickSize: 0,
				//     tickPadding: 0,
				//     tickRotation: 0,
				//     legend: 'Volume',
				//     legendOffset: -25,
				//     legendPosition: 'middle'
				// }}
					pointSize={0}
				// pointColor={{ theme: 'background' }}
					pointBorderWidth={2}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-12}
					enableArea
					areaOpacity={0.15}
					useMesh
					enableGridX={false}
					enableGridY={false}
					enablePoints={false}
				/>
				<div className={styles.legend_sections}>
					{(LegendsData || []).map((item) => (
						<div className={styles.legends_section_part}>
							<IcCFtick fill="#C4DC91" />
							<p className={styles.legend_name}>{item.label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default GraphDataCard;
