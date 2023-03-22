import { Carousel } from '@cogoport/components';

import CombinedPieChart from './CombinedPieChart';
import styles from './styles.module.css';
import ViewCountPieChart from './ViewCountPieChart';

function PieChart({ pie_data, pie_outer_data, view_count_data }) {
	const CarouselData = [{
		key    : 'combined_pie_chart',
		render : () => (
			<CombinedPieChart
				pie_data={pie_data}
				pie_outer_data={pie_outer_data}
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
	}];
	return (
		<div className={styles.carousel_data_container}>
			<Carousel size="md" slides={CarouselData} />
		</div>

	);
}

export default PieChart;
