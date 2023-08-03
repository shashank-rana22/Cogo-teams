import useGraphData from '../hooks/useGraphData';

import Filters from './Filters';
import LineGraph from './LineGraph';
import useGetFaqTokenUtilizationStats from './LineGraph/getFaqTokenUtilizationStats';
import PieChart from './PieChart';
import styles from './styles.module.css';
import useGetFormattedGraphData from './useGetFormattedGraphData';

function GraphUI() {
	const {
		pie_data,
		pie_outer_data,
		graph_data,
		dateRange,
		setDateRange,
		view_count_data,
		total_searches,
		formatStartDate,
		formatEndDate,
	} = useGraphData();

	const { graphData = [] } = useGetFormattedGraphData({ graph_data });

	const {
		tokenData,
		cost_details,
		showTotalCost,
		setShowTotalCost,
	} = useGetFaqTokenUtilizationStats({
		formatStartDate,
		formatEndDate,
	});

	return (
		<>
			<Filters
				dateRange={dateRange}
				setDateRange={setDateRange}
				cost_details={cost_details}
				showTotalCost={showTotalCost}
			/>

			<div
				className={styles.date}
			>
				<div className={styles.line_chart}>
					<LineGraph
						graphData={graphData}
						tokenData={tokenData}
						showTotalCost={showTotalCost}
						setShowTotalCost={setShowTotalCost}
					/>
				</div>

				<div className={styles.pie_container}>
					<PieChart
						pie_data={pie_data}
						pie_outer_data={pie_outer_data}
						view_count_data={view_count_data}
						total_searches={total_searches}
					/>
				</div>
			</div>
		</>
	);
}

export default GraphUI;
