import Loader from '../../commons/Loader';
import useListLastMileDeskShipments from '../../hooks/useListLastMileDeskShipments';

import AppliedFilters from './AppliedFilters';
import DeskTabs from './DeskTabs';
import Filters from './Filters';
import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Fcl() {
	const { data, loading } = useListLastMileDeskShipments();

	return (
		<div>
			<div className={styles.header}>
				<h1>Last Mile Desk</h1>

				<div>
					<Filters />
				</div>
			</div>

			<AppliedFilters />

			<DeskTabs />

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
export default Fcl;
