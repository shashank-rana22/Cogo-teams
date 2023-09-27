import { ShipmentChat } from '@cogoport/shipment-chat';
import React from 'react';

import styles from './styles.module.css';

function Header() {
	return (
		<div>
			<div className={styles.heading}>SO2 - Docs Dashboard Air</div>

			<ShipmentChat />
		</div>
	);
}

export default Header;
