import { ResponsiveLine } from '@cogoport/charts/line';
import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

// import { graphPastMonthData } from '../../../configurations/past-months-graph-data';
import usegetRfqGraph from '../../../hooks/useGetRfqGraph';

import EmptyLineChart from './EmptyStateLineChart';
import LineChartLoader from './LoaderGraph';
import styles from './styles.module.css';

function Graph({ rfq_id = '' }) {
	console.log('rfq_id::', rfq_id);
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

	const { getRfqGraph, data = {}, loading } = usegetRfqGraph();
	useEffect(() => {
		getRfqGraph({ rfq_id });
	}, [getRfqGraph]);

	const { graph_data = {} } = data;
	// console.log(graph_data, 'graph_data');

	const graphPastMonthData = Object.entries(graph_data?.y_axis || {}).map(([key, value]) => ({
		x : key,
		y : value?.shipment_received,
	}));

	return (
		<div className={styles.container}>
			{(isEmpty(graphPastMonthData) && !loading)
				? <EmptyLineChart />
				:			(
					<>
						<div className={styles.heading}>Past 12 Months Data</div>
						{loading ? <LineChartLoader /> : (
							<div className={styles.graph_container}>
								<ResponsiveLine
									width={380}
									height={120}
									data={graphPastMonthData}
									colors={['#FFEBAD']}
									margin={{ top: 15, right: 10, bottom: 35, left: 35 }}
									xScale={{ type: 'point' }}
									yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
									yFormat=" >-.2f"
									axisTop={null}
									axisRight={null}
									axisBottom={{
										tickSize    : 0,
										tickPadding : 20,
									}}
									axisLeft={{
										tickSize     : 0,
										orient       : 'left',
										tickValues   : 0,
										legend       : 'Volume',
										legendOffset : -25,

									}}
									pointSize={0}
				// pointColor={{ theme: 'background' }}
									pointBorderWidth={2}
									pointBorderColor={{ from: 'serieColor' }}
									pointLabelYOffset={-12}
									enableArea
									areaOpacity={2}
									useMesh
									enableGridX={false}
									enableGridY={false}
									enablePoints={false}
									defs={[{
										id     : 'gradientC',
										type   : 'linearGradient',
										colors : [
											{ offset: 0, color: '#FFEBAD' },
											{ offset: 27, color: '#FFEBAD' },
											{ offset: 100, color: '#FFFFFF45' },
										],
									}]}
									fill={[
										{ match: '*', id: 'gradientC' },
									]}
									animate
					// colors="linear-gradient(to bottom, #FFEBAD, #FFFFFF45)"
									colorBy="id"
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
						)}
					</>
				)}

		</div>
	);
}
export default Graph;
