import MyResponsivePie from '../../../Components/PieChart';
import { PieChartData } from '../../../Components/PieChart/PieChartData';
import ResponsiveBarChart from '../../../Components/ResponsiveBarChart';

import styles from './styles.module.css';

function RejectedCharts({ filters = {} }) {
	const data = [
		{
			currency : 'INR',
			expense  : 837784238.4197,
			income   : 845662525.2724,
			month    : 'FEBRUARY',
		},
		{
			currency : 'INR',
			expense  : 837784238.4197,
			income   : 845662525.2724,
			month    : 'MARCH',
		},
		{
			currency : 'INR',
			expense  : 837784238.4197,
			income   : 845662525.2724,
			month    : 'APRIL',
		},
		{
			currency : 'INR',
			expense  : 837784238.4197,
			income   : 845662525.2724,
			month    : 'MAY',
		},
	];
	return (
		<>
			<div className={styles.responsive_bar_chart}>
				<ResponsiveBarChart barData={data} />
			</div>
			<div className={styles.responsive_pie}>

				<MyResponsivePie data={PieChartData(filters)} />
			</div>
		</>
	);
}
export default RejectedCharts;
