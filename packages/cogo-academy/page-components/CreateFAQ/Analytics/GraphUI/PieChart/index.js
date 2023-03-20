import { Carousel } from '@cogoport/components';

import CombinedPieChart from './CombinedPieChart';
import styles from './styles.module.css';
import ViewCountPieChart from './ViewCountPieChart';

function PieChart({ pie_data, pie_outer_data, view_count_data }) {
	const CarouselData = [{
		key    : 'combined_pie_chart',
		render : () => (
			<div style={{ width: '100%', height: '100%' }}>
				<CombinedPieChart
					pie_data={pie_data}
					pie_outer_data={pie_outer_data}
				/>
			</div>

		),
	},
	{
		key    : 'view_count_pieChart',
		render : () => (
			<div style={{ width: '100%', height: '100%' }}>
				<ViewCountPieChart
					view_count_data={view_count_data}
				/>
			</div>

		),
	}];

	return (
		<div className={styles.Carousel_data_container}>
			<Carousel size="md" slides={CarouselData} />
		</div>

	);
}

export default PieChart;
