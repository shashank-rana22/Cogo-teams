import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
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
import getCriticalShipment from '../../../helpers/getCriticalShipment';

import styles from './styles.module.css';

const SHIPMENT_TYPE_IN_ROUTE = {
	fcl_freight : 'fcl',
}

function Card({ data = {} }) {
	const router = useRouter();

	const { shipmentType, stepperTab, activeTab } = useContext(KamDeskContext);

	const icon_type = ['fcl_local', 'fcl_customs', 'fcl_cfs'].includes(stepperTab)
		? stepperTab
		: shipmentType;

	const isShipmentCritical = !!getCriticalShipment({ shipment: data, shipmentType, activeTab, stepperTab });

	const handleCardClick = () => {
		const newUrl = Object.keys(SHIPMENT_TYPE_IN_ROUTE).includes(shipmentType) ? 
		`${window.location.origin}/v2/${router?.query?.partner_id}/booking/${SHIPMENT_TYPE_IN_ROUTE[shipmentType]}/${data?.id}` 
		: `${window.location.origin}/${router?.query?.partner_id}/shipments/${SHIPMENT_TYPE_IN_ROUTE[shipmentType]}/${data?.id}`

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div
			onClick={handleCardClick}
			className={cl`${styles.container} ${isShipmentCritical ? styles.animate_card : ''}`}
			role="button"
			tabIndex={0}
		>
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
