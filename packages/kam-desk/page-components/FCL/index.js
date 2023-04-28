import DeskTabs from '../../common/DeskTabs';
import HeaderFilters from '../../common/HeaderFilters';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListKamDeskShipments from '../../hooks/useListKamDeskShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Fcl() {
	const { data } = useListKamDeskShipments({});

	return (
		<div>
			<div className={styles.header}>
				<div>
					<ShipmentType />
				</div>
				<HeaderFilters />
			</div>

			<div className={styles.stepper_container}>
				<StepperTabs />
			</div>

			<div className={styles.tabs_container}>
				<DeskTabs />
			</div>

			<div>
				<ShipmentList data={data} />
			</div>
		</div>
	);
}

export default Fcl;
