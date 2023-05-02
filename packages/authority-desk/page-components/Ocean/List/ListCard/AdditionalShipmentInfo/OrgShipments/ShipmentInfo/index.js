import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ShipmentInfo({ item = {} }) {
	return (

		<div className={styles.card_wrapper}>
			<div>
				{item?.serial_id}
			</div>
			<div>
				{startCase(item?.shipment_type)}
			</div>
			<div>
				{startCase(item?.trade_type)}
			</div>
			<div>
				{item?.serial_id}
			</div>
			<div>
				{item?.serial_id}
			</div>
			<div>
				{item?.serial_id}
			</div>
			<div>
				{item?.serial_id}
			</div>
			<div>
				{item?.serial_id}
			</div>
		</div>

	);
}

export default ShipmentInfo;
