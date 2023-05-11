import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import HeaderFilters from '../../common/HeaderFilters';
import Loader from '../../common/Loader';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListKamDeskSurfaceShipments from '../../hooks/useListKamDeskSurfaceShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Surface() {
	const { data, loading } = useListKamDeskSurfaceShipments();

	return (
		<div>
			<div className={styles.header}>
				<div>
					<ShipmentType />
				</div>
			</div>

			<div className={styles.stepper_container}>
				<StepperTabs />
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

export default Surface;
