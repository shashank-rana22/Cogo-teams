import { isEmpty } from '@cogoport/utils';
import React from 'react';

import documentTypeMapping from '../../../../../../configurations/document-type-mapping';

import styles from './styles.module.css';

function ActionsStatus({ orgId = '', setShowModal = () => {}, setSingleItem = () => {}, item = {} }) {
	const { document_type = '', state = '' } = item || {};
	const handleClick = (val) => {
		setShowModal(val?.document_type);
		setSingleItem(val);
	};

	return (
		<div>
			{!isEmpty(orgId) && documentTypeMapping(document_type) !== 'Shipment' && (
				<div>
					{isEmpty(state) || state === 'document_rejected' ? (
						<div
							role="presentation"
							className={styles.manually}
							onClick={() => handleClick(item)}
						>
							Upload Manually
						</div>
					) : (
						<div
							className={styles.upload}
						>
							Uploaded
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ActionsStatus;
