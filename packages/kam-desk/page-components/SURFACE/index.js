import AppliedFilters from '../../common/AppliedFilters';
import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import HeaderFilters from '../../common/HeaderFilters';
import Loader from '../../common/Loader';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListKamDeskSurfaceShipments from '../../hooks/useListKamDeskSurfaceShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Surface({ activeTab = '' }) {
	const { data, loading } = useListKamDeskSurfaceShipments();

	return (
		<div>
			<div className={styles.header}>
				<ShipmentType />

				<HeaderFilters />
			</div>

			<div className={styles.stepper_container}>
				<StepperTabs />

				<Filters />
			</div>

			<AppliedFilters />

			<div className={styles.tabs_container}>
				<DeskTabs />
			</div>

			{loading
				? <Loader />
				: (
					<ShipmentList
						data={data}
						loading={loading}
						activeTab={activeTab}
					/>
				)}
		</div>
	);
}

export default Surface;
