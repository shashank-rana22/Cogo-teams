import { Carousel } from '@cogoport/components';

import CombinedPieChart from './CombinedPieChart';
import SearchRequestedPieChart from './SearchRequestedPieChart';
import styles from './styles.module.css';
import ViewCountPieChart from './ViewCountPieChart';

function PieChart({ pie_data, pie_outer_data, view_count_data, total_searches }) {
	const CarouselData = [{
		key    : 'combined_pie_chart',
		render : () => (
			<CombinedPieChart
				pie_data={pie_data}
				total_searches={total_searches}
			/>
		),
	},
	{
		key    : 'view_count_pieChart',
		render : () => (
			<ViewCountPieChart
				view_count_data={view_count_data}
			/>
		),
	},
	{
		key    : 'search_requested_pie_chart',
		render : () => (
			<SearchRequestedPieChart
				pie_outer_data={pie_outer_data}

			/>
		),
	}];

	return (
		<div className={styles.carousel_data_container}>
			<Carousel size="md" slides={CarouselData} showArrow={false} />
		</div>

	);
}

export default PieChart;
