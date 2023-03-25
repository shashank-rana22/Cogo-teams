import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import documentTypeMapping from '../../../../../../configurations/document-type-mapping';

import styles from './styles.module.css';

function ActionsStatus({
	orgId = '',
	setShowModal = () => {},
	setSingleItem = () => {},
	item = {},
	isPanUploaded,
	isGstUploaded,
}) {
	const { document_type = '' } = item || {};

	const handleClick = (val) => {
		setShowModal(val?.document_type);
		setSingleItem(val);
	};
	const checkDocumentType = document_type === 'undefined';

	const reqDocuments = useMemo(() => {
		const documents = [];
		switch (document_type) {
			case 'pan':
				return !isPanUploaded ? ['pan'] : [];
			case 'gst':
				return !isGstUploaded ? ['gst'] : [];
			default:
				if (!isPanUploaded) {
					documents.push('pan');
				}
				if (!isGstUploaded) {
					documents.push('gst');
				}
				return documents;
		}
	}, [document_type, isGstUploaded, isPanUploaded]);

	return (
		<div>
			{!isEmpty(orgId) && (
				<div className={styles.upload_container}>
					<div className={styles.document_name}>
						{!checkDocumentType && (
							startCase(document_type)
						)}
					</div>
					{!isEmpty(reqDocuments) ? (
						<div
							role="presentation"
							className={styles.manually}
							onClick={() => handleClick(item)}
						>
							Upload Manually
						</div>
					) : (
						<div className={styles.upload}>
							{(document_type !== 'undefined' && documentTypeMapping(document_type) !== 'Shipment') && (
								<>
									<IcCFtick width={15} height={15} className={styles.ic_tick} />
									Uploaded
								</>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ActionsStatus;
