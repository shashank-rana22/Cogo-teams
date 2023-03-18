import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import Actions from './Actions';
import Card from './Card';
// import LoadingState from './LoadingState';
import styles from './styles.module.css';

function CheckList({
	data,
	setShow,
	setShowConfirmed,
	// loading,
	emailDocs,
	completedDocs,
	// shipmentDocumentsRefetch,
	// addDocument,
}) {
	const [documentDetails, setDocumentDetails] = useState({});
	const [updateFreightCertificate, setUpdateFreightCertificate] =	useState(false);
	const [showHbl, setShowHbl] = useState(null);

	const { primary_service, shipment_data } = useContext(ShipmentDetailContext);

	// const handleClick = async (item) => {
	// 	await addDocument({
	// 		values: {
	// 			name          : item?.file_name || item?.document_url,
	// 			document_type : item?.docType,
	// 			image_url     : item?.document_url,
	// 		},
	// 	});
	// };

	const content = (item) => (
		<div className={styles.action_wrapper}>
			<div
				role="button"
				tabIndex="0"
				className={styles.action}
				// onClick={() => handleClick(item)}

			>
				Add to Document Wallet
			</div>
		</div>
	);

	return (
		<div className={styles.wrapper}>

			<Card
				data={data}
				completedDocs={completedDocs}
				emailDocs={emailDocs}
				content={content}
				setShowHbl={setShowHbl}
				setUpdateFreightCertificate={setUpdateFreightCertificate}
				setShowConfirmed={setShowConfirmed}
				setShow={setShow}
				shipment_data={shipment_data}
				primary_service={primary_service}
				setDocumentDetails={setDocumentDetails}
			/>

			<Actions
				shipment_data={shipment_data}
				showHbl={showHbl}
				updateFreightCertificate={updateFreightCertificate}
				setUpdateFreightCertificate={setUpdateFreightCertificate}
				// shipmentDocumentsRefetch={shipmentDocumentsRefetch}
				primary_service={primary_service}
				setShowHbl={setShowHbl}
				documentDetails={documentDetails}
			/>
		</div>
	);
}

export default CheckList;
