import DeskTabs from '../../common/DeskTabs';
import Filters from '../../common/Filters';
import Loader from '../../common/Loader';
import Stepper from '../../common/Stepper';
import StepperTabs from '../../common/StepperTabs';
import useListCostBookingDeskShipments from '../../hooks/useListCostBookingDeskShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function FclFreight() {
	const { loading, data } = useListCostBookingDeskShipments();

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.stepper_container}>
					<Stepper />
				</div>

				<Filters />
			</div>

			<StepperTabs />

			<DeskTabs />

			<div>
				{loading ? (
					<Loader />
				) : (
					<ShipmentList
						data={data}
					/>
				)}
			</div>
		</div>
	);
}
export default FclFreight;
