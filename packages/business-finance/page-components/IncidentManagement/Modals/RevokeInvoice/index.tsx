import { Button, Modal, Textarea } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetRevokeInvoiceData from '../../apisModal/useGetRevokeInvoiceData';
import ViewButton from '../../common/ViewButton';

import styles from './style.module.css';

function RevokeInvoice({ id, refetch, row, isEditable = true, remark = '' }) {
	const { data = {} } = row || {};
	const { revokeInvoiceRequest = {} } = data;
	const { agreementNumber, documentUrls, agreementDate, invoiceNumber } = revokeInvoiceRequest;
	const agreementDocument = (documentUrls || [])[0];
	const [showModal, setShowModal] = useState(false);
	const [remarks, setRemarks] = useState(remark);
	const [reqRevokeInvoiceRequest, setReqRevokeInvoiceRequest] = useState(revokeInvoiceRequest);

	const { useOnAction:OnAction, loading } = useGetRevokeInvoiceData({
		refetch,
		setShowModal,
		id,
		row,
		reqRevokeInvoiceRequest,
		remarks,
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
					<Modal.Header title="Revoke Invoice" />
					<Modal.Body>
						<div className={styles.flex}>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Agreement Number
								</div>
								<div className={styles.date_value}>
									#
									{agreementNumber || '-'}
								</div>
							</div>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Agreement Date
								</div>
								<div className={styles.date_value}>
									{(new Date(agreementDate)).toDateString() || '-'}
								</div>
							</div>
							<div className={styles.value_data}>
								<div className={styles.label_value}>
									Invoice Number
								</div>
								<div className={styles.date_value}>
									{invoiceNumber || '-'}
								</div>
							</div>

						</div>
						<div className={styles.document_flex}>
							<div className={styles.document}>
								Document -
							</div>
							{agreementDocument !== '' ? (
								<a href={agreementDocument} target="_blank" rel="noreferrer" key={agreementDocument}>
									<div className={styles.view_flex}>
										<div className={styles.view}>View Agreement</div>
										<IcMEyeopen />
									</div>

								</a>
							) : (
								<div key={agreementDocument}> No document available</div>
							)}
						</div>

						<div>
							Cancel Reason
						</div>
						<Textarea
							value={reqRevokeInvoiceRequest?.cancelReason}
							disabled={!isEditable}
							onChange={(e) => setReqRevokeInvoiceRequest({
								...reqRevokeInvoiceRequest,
								cancelReason: e,
							})}
							placeholder="Cancel E-invoice Reason ..."
						/>

						<div>
							Remark
						</div>
						<Textarea
							value={remarks}
							disabled={!isEditable}
							onChange={setRemarks}
							placeholder="Remark here ...."
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
										OnAction('REJECTED');
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remarks?.length) || loading}
									loading={loading}
									onClick={() => {
										OnAction('APPROVED');
									}}
								>
									Approve
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
