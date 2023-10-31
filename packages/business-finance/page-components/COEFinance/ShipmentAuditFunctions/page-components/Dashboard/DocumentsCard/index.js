import { Loader } from '@cogoport/components';
import { IcADocumentTemplates, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import Documents from './Documents';
import styles from './styles.module.css';

function DocumentsCard({
	loadingShipment = false,
	onTabClick = () => {},
	tab = {},
	shipmentId = '',
}) {
	return (
		<div className={styles.card}>
			<div
				className={styles.card_upper}
				onClick={() => onTabClick({ tabName: 'documentsTab' })}
				role="presentation"
			>
				<div className={styles.sub_container}>
					Shipment Documents
					<IcADocumentTemplates height="17px" width="17px" />
					{loadingShipment && (
						<Loader />
					)}
				</div>

				<div
					className={styles.caret}
					role="presentation"
				>
					{tab.documentsTab ? (
						<IcMArrowRotateUp height="17px" width="17px" />
					) : (
						<IcMArrowRotateDown height="17px" width="17px" />
					)}
				</div>
			</div>
			{tab.documentsTab && <div className={styles.hr} />}
			<div className={styles.documents}>
				{tab.documentsTab && <Documents shipmentId={shipmentId} />}
				{' '}
			</div>
		</div>
	);
}

export default DocumentsCard;
