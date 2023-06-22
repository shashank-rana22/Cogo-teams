// import Loader from '../../common/Loader';
import useListDocumentDesk from '../../hooks/useListDocumentDesk';
import RAIL from '../RAIL';

import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import StepperTabs from './StepperTabs';
import styles from './styles.module.css';

function FTL({ stepperTab }) {
	const { data, loading } = useListDocumentDesk();
	const tabData = data?.pending_tasks_stats;

	// if (loading) return (<Loader />);
	console.log('tabData', tabData);

	return (
		<div>
			<div className={styles.header}>
				<h1>SO2 Dashboard - Surface</h1>

				<Filters />
			</div>

			<StepperTabs />

			<DeskTabs tabData={tabData} />

			{stepperTab === 'ftl_freight'
				? (
					<ShipmentList
						loading={loading}
						data={data}
					/>
				)
				: null}

			{stepperTab === 'rail_domestic_freight'
				? <RAIL data={data} loading={loading} />
				: null}

		</div>
	);
}

export default FTL;
