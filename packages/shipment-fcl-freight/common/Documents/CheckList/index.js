import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import Card from './Card';
import styles from './styles.module.css';

function CheckList({
	taskList = [],
	emailDocs = [],
	completedDocs = [],
	setShowDoc = () => {},
	setShowApproved = () => {},
	shipmentDocumentRefetch = () => {},
}) {
	const { primary_service, shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.wrapper}>
			<Card
				taskList={taskList}
				completedDocs={completedDocs}
				emailDocs={emailDocs}
				shipment_data={shipment_data}
				primary_service={primary_service}
				setShowDoc={setShowDoc}
				setShowApproved={setShowApproved}
				shipmentDocumentRefetch={shipmentDocumentRefetch}
			/>
		</div>
	);
}

export default CheckList;
