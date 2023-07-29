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
import CONSTANTS from '../../../config/constants.json';
import KamDeskContext from '../../../context/KamDeskContext';
import getCriticalShipment from '../../../helpers/getCriticalShipment';

import styles from './styles.module.css';

function Card({ data = {} }) {
	const router = useRouter();

	const { shipmentType, stepperTab, activeTab } = useContext(KamDeskContext);

	const icon_type = ['fcl_local', 'fcl_customs', 'fcl_cfs'].includes(stepperTab)
		? stepperTab
		: shipmentType;

	const isShipmentCritical = !!getCriticalShipment({ shipment: data, shipmentType, activeTab, stepperTab });

	let href = `${window.location.origin}/${router?.query?.partner_id}/shipments`;
	href += `/${data?.id}?${CONSTANTS.url_navigation_params}`;

	const handleCardClick = (e) => {
		const newUrl = e.currentTarget.href;
		window.sessionStorage.setItem('prev_nav', newUrl);
	};

	return (
		<a
			href={href}
			onClick={handleCardClick}
			className={cl`${styles.container} ${isShipmentCritical ? styles.animate_card : ''}`}
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
		</a>
	);
}

export default Card;
