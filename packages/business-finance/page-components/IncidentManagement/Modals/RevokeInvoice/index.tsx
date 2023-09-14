import { Button, Modal, Textarea } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetRevokeInvoiceData from '../../apisModal/useGetRevokeInvoiceData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './style.module.css';

function RevokeInvoice({ id, refetch, row, isEditable = true, remark = '' }) {
	const { t } = useTranslation(['incidentManagement']);
	const { data: { revokeInvoiceRequest = {} } } = row || {};
	const { documentUrls = [], invoiceNumber = '' } = revokeInvoiceRequest;
	const agreementDocument = documentUrls[0] || '';
	const [showModal, setShowModal] = useState(false);
	const [remarks, setRemarks] = useState(remark);
	const [reqRevokeInvoiceRequest, setReqRevokeInvoiceRequest] = useState(revokeInvoiceRequest);
	const { useOnAction:onAction, loading } = useGetRevokeInvoiceData({
		refetch,
		setShowModal,
		id,
		reqRevokeInvoiceRequest,
		setReqRevokeInvoiceRequest,
		remarks,
		t,
	});

	return (
		<div>
			<ViewButton state={setShowModal} />
			{showModal ? (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title={t('incidentManagement:invoice_revoke')} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}

						<div className={styles.flex_container}>
							<div className={styles.label_flex}>
								{t('incidentManagement:invoice_number')}
							</div>
							<div className={styles.date_value}>
								{`: ${invoiceNumber || '-'}`}
							</div>
						</div>

						<div className={styles.flex_container}>
							<div className={styles.label_flex}>
								{t('incidentManagement:cancel_reason')}
							</div>
							<div className={styles.date_value}>
								{`: ${reqRevokeInvoiceRequest?.cancelReason || '-'}`}
							</div>
						</div>

						<div className={styles.label_flex}>
							<div className={styles.document}>
								{`${t('incidentManagement:doc')} -`}
							</div>
							<div style={{ marginLeft: '2px' }}>
								{agreementDocument !== '' ? (
									<a
										href={agreementDocument}
										target="_blank"
										rel="noreferrer"
										key={agreementDocument}
									>
										<div className={styles.view_flex}>
											<div className={styles.view}>{t('incidentManagement:view_doc_link')}</div>
											<IcMEyeopen
												fill="#f68b21"
											/>
										</div>

									</a>
								) : (
									<div key={agreementDocument}>
										{' '}
										{t('incidentManagement:no_doc_available')}
									</div>
								)}
							</div>
						</div>

						<div className={styles.remarks_flex}>
							{`${t('incidentManagement:remarks')}*`}
						</div>
						<Textarea
							value={remarks}
							disabled={!isEditable}
							onChange={setRemarks}
							placeholder={t('incidentManagement:remarks_placeholder')}
							style={{ height: '80px' }}
						/>

					</Modal.Body>
					{isEditable ? (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(remarks?.length) || loading}
									loading={loading}
									onClick={() => {
										onAction('REJECTED');
									}}
								>
									{t('incidentManagement:reject_btn')}
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remarks?.length) || loading}
									loading={loading}
									onClick={() => {
										onAction('APPROVED');
									}}
								>
									{t('incidentManagement:approve_btn')}
								</Button>
							</div>
						</Modal.Footer>
					) : null}
				</Modal>
			) : null}
		</div>
	);
}
export default RevokeInvoice;
