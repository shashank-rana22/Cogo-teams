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

function Card({ data = {} }) {
	const router = useRouter();

	const { shipmentType, stepperTab, activeTab } = useContext(KamDeskContext);

	const icon_type = ['lcl_customs'].includes(stepperTab)
		? stepperTab
		: shipmentType;

	const isShipmentCritical = getCriticalShipment({
		shipment: data,
		activeTab,
		stepperTab,
		shipmentType,
	});

	const handleCardClick = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${data?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div
			className={cl`${styles.container} ${
				isShipmentCritical ? styles.animate_card : ''
			}`}
			onClick={handleCardClick}
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
