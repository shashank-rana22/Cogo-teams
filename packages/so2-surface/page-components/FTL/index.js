import Loader from '../../common/Loader';
import useListDocumentDesk from '../../hooks/useListDocumentDesk';

import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import StepperTabs from './StepperTabs';
import styles from './styles.module.css';

function FTL() {
	const { data } = useListDocumentDesk();
	const tabData = data?.pending_tasks_stats;

	const loading = false;

	return (
		<div>
			<div className={styles.header}>
				<h1>SO2 Dashboard - Surface</h1>

				<Filters />
			</div>

			<StepperTabs />

			<DeskTabs tabData={tabData} />

			{loading
				? <Loader />
				: (
					<ShipmentList
						loading={loading}
						data={data}
					/>
				)}

		</div>
	);
}

export default FTL;
