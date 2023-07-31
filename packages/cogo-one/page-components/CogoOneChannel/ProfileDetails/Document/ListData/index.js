import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPdf } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DocumentTypeSID from '../../../../../common/DocumentTypeSID';
import EmptyState from '../../../../../common/EmptyState';
import documentTypeMapping from '../../../../../configurations/document-type-mapping';
import documentStatus from '../DocumentStatus';

import ActionsStatus from './ActionsStatus';
import styles from './styles.module.css';

function ListData({
	userId = '',
	userMobile = '',
	leadUserId = '',
	list = [],
	orgId = '',
	setShowModal = () => {},
	setSingleItem = () => {},
	isGstUploaded = false,
	isPanUploaded = false,
	formattedMessageData = {},
}) {
	const [documentTagUrl, setDocumentTagUrl] = useState('');

	const { control, formState: { errors = {} }, watch, handleSubmit, resetField, reset } = useForm();

	const handleOpenFile = (val) => {
		window.open(val, '_blank');
	};

	const checkStatus = (status, state) => {
		let finalStatus = '';
		if (status === 'verified' && state === 'document_uploaded') {
			finalStatus = 'submitted';
		} else if (status === 'unverified') {
			finalStatus = 'not_submitted';
		} else {
			finalStatus = status;
		}
		return finalStatus;
	};

	const emptyCheck = (!userId && !userMobile && !leadUserId) || isEmpty(list);

	return (
		<div>
			{emptyCheck ? (
				<div className={styles.empty}>
					<EmptyState type="documents" />
				</div>
			) : (
				<div className={styles.list_container}>
					{ (list || []).map((item) => {
						const {
							id = '',
							created_at = '',
							document_type = '',
							document_url = '',
							state = '',
							file_name = '',
							verification_status = '',
						} = item || {};

						return (
							<>
								<div className={styles.activity_date}>
									<div className={styles.dot} />
									<div className={styles.durations}>
										{formatDate({
											date       : created_at,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
											timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
											formatType : 'dateTime',
											separator  : '|',
										})}
									</div>
								</div>
								<div className={styles.main_card}>
									<div className={cl`${styles.card} 
									${document_type === 'undefined' ? styles.wrong : ''}`}
									>
										<div className={styles.header}>
											{documentStatus(checkStatus(verification_status, state))}

											<div className={cl`${styles.document_type} 
												${document_type === 'undefined'
												? styles.wrong_document_type
												: ''}`}
											>
												{documentTypeMapping(document_type)}
											</div>
										</div>

										<div className={styles.content}>
											Document sent by customer
										</div>
										<div
											role="presentation"
											className={styles.document}
											onClick={() => handleOpenFile(document_url)}
										>
											<IcMPdf
												width={18}
												height={18}
												fill={document_type === 'gst' ? '#C4DC91' : '#88CAD1'}
											/>
											<div className={styles.document_name}>
												{startCase(file_name)}
											</div>
										</div>

										<ActionsStatus
											item={item}
											orgId={orgId}
											setShowModal={setShowModal}
											setSingleItem={setSingleItem}
											isPanUploaded={isPanUploaded}
											isGstUploaded={isGstUploaded}
										/>

										{orgId && (
											<Button
												key={document_url}
												className={styles.tag_button}
												onClick={() => setDocumentTagUrl(document_url)}
											>
												Tag
											</Button>
										)}
									</div>
								</div>
								{(documentTagUrl === document_url && orgId) && (
									<DocumentTypeSID
										key={document_url}
										id={id}
										orgId={orgId}
										formattedMessageData={formattedMessageData}
										documentTagUrl={documentTagUrl}
										setDocumentTagUrl={setDocumentTagUrl}
										type="documents"
										control={control}
										errors={errors}
										watch={watch}
										handleSubmit={handleSubmit}
										resetField={resetField}
										reset={reset}
									/>
								)}
							</>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default ListData;
