import AppliedFilters from '../../common/AppliedFilters';
import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import GoToAuthorityDesk from '../../common/GoToAuthorityDesk';
import HeaderFilters from '../../common/HeaderFilters';
import Loader from '../../common/Loader';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListShipments from '../../hooks/useListShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

const SERVICE_TYPE = 'air';

function Air() {
	const { data, loading } = useListShipments();

	return (
		<div>
			<div className={styles.header}>
				<ShipmentType />

				<div className={styles.right_box}>
					<HeaderFilters />
					<GoToAuthorityDesk service_type={SERVICE_TYPE} />
				</div>
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
					/>
				)}
		</div>
	);
}

export default Air;
