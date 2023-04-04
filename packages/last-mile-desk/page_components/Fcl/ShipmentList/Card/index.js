import { cl } from '@cogoport/components';
import { useContext } from 'react';

import LastMileDeskContext from '../../../../context/LastMileDeskContext';
import getCriticalShipment from '../../../../helpers/getCriticalShipment';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function Card({ item = {} }) {
	const { activeTab } = useContext(LastMileDeskContext);
	const isShipmentCritical = getCriticalShipment({ tab: activeTab, shipment: item });

	return (
		<div className={cl`${styles.container} ${isShipmentCritical ? styles.animate_card : ''}`}>
			<Header item={item} />
			<Body item={item} />
		</div>
	);
}

export default Card;
