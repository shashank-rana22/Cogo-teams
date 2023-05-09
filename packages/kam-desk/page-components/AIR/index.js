import DeskTabs from '../../common/DeskTabs';
import Loader from '../../common/Loader';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListShipments from '../../hooks/useListShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Air() {
	const { data, loading } = useListShipments();

	return (
		<div>
			<div className={styles.header}>
				<div>
					<ShipmentType />
				</div>
			</div>

			<div className={styles.stepper_container}>
				<StepperTabs />
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

export default Air;
