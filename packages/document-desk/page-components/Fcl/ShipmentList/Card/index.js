import { IcMFfcl, IcMFlocalCharges, IcMFcustoms, IcMFcfs } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useContext } from 'react';

import DocumentDeskContext from '../../../../context/DocumentDeskContext';
import getCriticalShipment from '../../../../helpers/getCriticalShipment';

import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CargoPills from './CargoPills';
import DualLocation from './PortDetails/DualLocation';
import SingleLocation from './PortDetails/SingleLocation';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

const iconMapping = {
	fcl_freight       : { Icon: IcMFfcl, text: 'FCL' },
	fcl_freight_local : { Icon: IcMFlocalCharges, text: 'FCL Local' },
	fcl_customs       : { Icon: IcMFcustoms, text: 'FCL Customs' },
	fcl_cfs           : { Icon: IcMFcfs, text: 'FCL CFS' },
};

export default function Card({ item = {} }) {
	const router = useRouter();
	const { activeTab } = useContext(DocumentDeskContext);

	const isShipmentCritical = getCriticalShipment({ tab: activeTab, shipment: item });

	const clickCard = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const iconProps = iconMapping[item?.shipment_type];

	return (
		<div
			role="button"
			tabIndex={0}
			className={`${styles.card} ${isShipmentCritical ? styles.animate_card : ''}`}
			onClick={clickCard}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<div className={styles.shipment_info}>
					<ShipmentInfo item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.location_container}>
					{item?.shipment_type === 'fcl_freight'
						? <DualLocation data={item} icon={iconProps} />
						: <SingleLocation data={item} icon={iconProps} />}
				</div>

				<div className={styles.separator} />

				<div className={styles.cargo_pill}>
					<CargoPills item={item} />
				</div>
			</div>

			<CardFooter item={item} />
		</div>
	);
}
