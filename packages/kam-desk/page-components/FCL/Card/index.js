import { useContext } from 'react';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
	SingleLocation,
} from '../../../common/ShipmentCard';
import KamDeskContext from '../../../context/KamDeskContext';

import styles from './styles.module.css';

function Card({ data = {} }) {
	const { shipmentType, stepperTab } = useContext(KamDeskContext);

	const icon_type = ['fcl_local', 'fcl_customs'].includes(stepperTab)
		? stepperTab
		: shipmentType;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header data={data} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.details_container}>
					<BasicDetails data={data} />

					<AssignedStakeholder data={data} />
				</div>

				<div className={styles.divider} />

				<div className={styles.icon_container}>
					<ShipmentIcon shipment_type={icon_type} />
				</div>

				<div className={styles.location_container}>
					{['export', 'import'].includes(stepperTab) ? (
						<DualLocation data={data} />
					) : (
						<SingleLocation data={data} />
					)}
				</div>

				<div className={styles.divider} />

				<div className={styles.pill_container}>
					<CargoPills data={data} />
				</div>
			</div>
		</div>
	);
}

export default Card;
