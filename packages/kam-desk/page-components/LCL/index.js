import DeskTabs from '../../common/DeskTabs';
import HeaderFilters from '../../common/HeaderFilters';
import ShipmentType from '../../common/ShipmentType';
import StepperTabs from '../../common/StepperTabs';
import useListKamDeskShipments from '../../hooks/useListKamDeskShipments';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function Lcl() {
	const { data } = useListKamDeskShipments({});

	return (
		<div>
			<div className={styles.header}>
				<div>
					<ShipmentType />
				</div>
				<HeaderFilters />
			</div>

			<div>
				<StepperTabs />
			</div>

			<div>
				<DeskTabs />
			</div>

			<div>
				<ShipmentList data={data} />
			</div>
		</div>
	);
}

export default Lcl;
