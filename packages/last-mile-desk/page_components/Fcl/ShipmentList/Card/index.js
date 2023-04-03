import { cl } from '@cogoport/components';

import getCriticalShipment from '../../../../helpers/getCritical';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

function Card({ item = {}, stateProps = { } }) {
	const { activeTab } = stateProps || {};
	const isShipmentCritical = getCriticalShipment({ tab: activeTab, shipment: item });

	return (
		<div className={cl`${styles.container} ${isShipmentCritical ? styles.animate_card : ''}`}>
			<Header item={item} />
			<Body item={item} stateProps={stateProps} />
		</div>
	);
}

export default Card;
