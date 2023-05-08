import { useContext } from 'react';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPillsV2,
	DualLocation,
	Header,
	SingleLocation,
} from '../../../common/ShipmentCard';
import KamDeskContext from '../../../context/KamDeskContext';

import styles from './styles.module.css';

function Card({ data = {} }) {
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
					<ShipmentIcon shipment_type="air_freight" />
				</div>

				<div className={styles.location_container}>
					<DualLocation data={data} />
				</div>

				<div className={styles.divider} />

				<div className={styles.pill_container}>
					<CargoPillsV2 data={data} />
				</div>
			</div>
		</div>
	);
}

export default Card;
