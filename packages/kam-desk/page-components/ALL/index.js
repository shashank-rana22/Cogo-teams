import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import HeaderFilters from '../../common/HeaderFilters';
import Loader from '../../common/Loader';
import ShipmentType from '../../common/ShipmentType';
import useListShipments from '../../hooks/useListShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function All() {
	const { data, loading } = useListShipments();

	return (
		<div>
			<div className={styles.header}>
				<ShipmentType />

				<HeaderFilters />
			</div>

			<div className={styles.filter_container}>
				<Filters />
			</div>

			<div className={styles.tabs_container}>
				<DeskTabs />
			</div>

			<div>
				{loading
					? <Loader />
					: <ShipmentList data={data} loading={loading} />}
			</div>
		</div>
	);
}

export default All;
