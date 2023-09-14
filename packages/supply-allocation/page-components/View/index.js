import { useSelector } from '@cogoport/store';

import Header from './Header';
import List from './List';
import PieChartGraphs from './PieChartGraphs';
import styles from './styles.module.css';

function View() {
	const { general = {} } = useSelector((state) => state);

	const { query = {} } = general;
	const { search_id } = query;

	return (
		<div className={styles.container} key={search_id}>
			<Header searchId={search_id} />

			<PieChartGraphs searchId={search_id} />

			<List search_id={search_id} />
		</div>
	);
}

export default View;
