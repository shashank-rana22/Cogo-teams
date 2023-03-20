import useGraphData from '../hooks/useGraphData';

import Filters from './Filters';
import LineGraph from './lineGraph';
import PieChart from './PieChart';
import styles from './styles.module.css';
import useGetFormattedGraphData from './useGetFormattedGraphData';

function GraphUI() {
	const { pie_data, pie_outer_data, graph_data, dateRange, setDateRange, view_count_data } = useGraphData();

	const { graphData = [] } = useGetFormattedGraphData({ graph_data });
	return (
		<>
			<Filters dateRange={dateRange} setDateRange={setDateRange} />
			<div
				style={{
					display         : 'flex',
					margin          : '-12px 0 20px 0',
					borderRadius    : '10px',
					height          : '400px',
					backgroundColor : '#FFF',
				}}
			>
				<div className={styles.line_chart}>
					<LineGraph graphData={graphData} />
				</div>

				<div className={styles.pie_container}>
					<PieChart
						pie_data={pie_data}
						pie_outer_data={pie_outer_data}
						view_count_data={view_count_data}
					/>

				</div>

			</div>
		</>
	);
}
export default GraphUI;
