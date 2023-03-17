import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import documentTypeMapping from '../../../../../../configurations/document-type-mapping';

import styles from './styles.module.css';

function ActionsStatus({ orgId = '', setShowModal = () => {}, setSingleItem = () => {}, item = {} }) {
	const { document_type = '', state = '', is_pan_uploaded = false, is_gst_uploaded = false } = item || {};
	const handleClick = (val) => {
		setShowModal(val?.document_type);
		setSingleItem(val);
	};
	const checkDocumentType = (['undefined']).includes(document_type);

	const checkUploadManually = !is_pan_uploaded || !is_gst_uploaded || isEmpty(state) || state === 'document_rejected';

	return (
		<div>
			{!isEmpty(orgId) && documentTypeMapping(document_type) !== 'Shipment' && (
				<div>
					{checkUploadManually ? (
						<div
							role="presentation"
							className={styles.manually}
							onClick={() => handleClick(item)}
						>
							Upload Manually
						</div>
					) : (
						<div className={styles.upload_container}>
							<div className={styles.document_name}>
								{!checkDocumentType && (
									startCase(document_type)
								)}

							</div>
							<div className={styles.upload}>
								<IcCFtick width={15} height={15} className={styles.ic_tick} />
								Uploaded
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ActionsStatus;
