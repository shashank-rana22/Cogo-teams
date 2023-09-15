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

						<div>
							<div className={styles.label_flex}>
								{t('incidentManagement:invoice_number')}
							</div>
							<div className={styles.date_value}>
								{invoiceNumber || '-'}
							</div>
						</div>
						<div className={styles.label_flex}>
							<div className={styles.document}>
								{`${t('incidentManagement:doc')} -`}
							</div>
							{agreementDocument !== '' ? (
								<a href={agreementDocument} target="_blank" rel="noreferrer" key={agreementDocument}>
									<div className={styles.view_flex}>
										<div className={styles.view}>{t('incidentManagement:view_agreement_link')}</div>
										<IcMEyeopen />
									</div>

								</a>
							) : (
								<div key={agreementDocument}>
									{' '}
									{t('incidentManagement:no_doc_available')}
								</div>
							)}
						</div>

						<div>
							{t('incidentManagement:cancel_reason')}
						</div>
						<Textarea
							value={reqRevokeInvoiceRequest?.cancelReason}
							disabled={!isEditable}
							onChange={(e) => setReqRevokeInvoiceRequest({
								...reqRevokeInvoiceRequest,
								cancelReason: e,
							})}
							placeholder={t('incidentManagement:cancel_invoice_reason')}
						/>

						<div>
							{t('incidentManagement:remarks')}
						</div>
						<Textarea
							value={remarks}
							disabled={!isEditable}
							onChange={setRemarks}
							placeholder={t('incidentManagement:remarks_placeholder')}
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
