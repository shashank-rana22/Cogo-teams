import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import Card from './Card';
import styles from './styles.module.css';

function CheckList({
	data,
	emailDocs,
	completedDocs,

}) {
	const { primary_service, shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.wrapper}>
			<Card
				data={data}
				completedDocs={completedDocs}
				emailDocs={emailDocs}
				shipment_data={shipment_data}
				primary_service={primary_service}
			/>
		</div>
	);
}

export default CheckList;
