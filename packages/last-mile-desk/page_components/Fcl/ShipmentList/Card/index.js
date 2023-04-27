import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useContext } from 'react';

import LastMileDeskContext from '../../../../context/LastMileDeskContext';
import getCriticalShipment from '../../../../helpers/getCriticalShipment';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function Card({ item = {} }) {
	const { activeTab } = useContext(LastMileDeskContext);
	const isShipmentCritical = getCriticalShipment({ tab: activeTab, shipment: item });

	const router = useRouter();

	const handleCardClick = () => {
		const { partner_id } = router.query;
		const newPathname = `${window.location.origin}/${partner_id}/shipments/${item.id}`;
		window.location.href = newPathname;
	};

	return (
		<div
			className={cl`${styles.container} ${isShipmentCritical ? styles.animate_card : ''}`}
			role="button"
			onClick={handleCardClick}
			tabIndex={0}
		>
			<Header item={item} />
			<Body item={item} />
		</div>
	);
}

export default Card;
