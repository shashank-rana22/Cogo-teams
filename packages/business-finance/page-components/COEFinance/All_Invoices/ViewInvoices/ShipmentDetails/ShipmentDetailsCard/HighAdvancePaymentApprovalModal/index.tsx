import { Toast, Button, ButtonIcon, Modal, Input } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { useGetAdvancedPaymentHistory } from '../../../../../hook/useGetAdvancedPaymentHistory';
import useUpdateShipmentDocuments from '../../../../../hook/useUpdateShipmentDocument';

import styles from './styles.module.css';

const ACCEPTED = 'accepted';
const REJECTED = 'rejected';

function HighAmountRequestModal({ invoiceData, modalData }) {
	const {

		invoiceNumber,
		serialNumber,
		invoiceUploadDate,
		invoice,
		totalInvoiceValue,
		advancedAmountValue,
		sellerOrganizationId,
		advancedPaymentObj,
	} = invoiceData || {};

	const [firstItem] = (advancedPaymentObj || []);
	const { document_url: advancePaymentProof } = firstItem || {};

	const { show, hide } = modalData;

	const [remark, setRemark] = useState('');

	const { query } = useRouter();

	const { loading, data } = useGetAdvancedPaymentHistory({ sellerOrganizationId });

	const { taskUpdateLoading, updateDocument } = useUpdateShipmentDocuments({});

	const paymentHistory = data;

	const { control, handleSubmit } = useForm();

	const handleApprove = (val) => {
		const documentProofLink = advancePaymentProof || val?.upload?.finalUrl;
		if (!documentProofLink) {
			Toast.error('Document proof is required');
			return;
		}
		if (!remark) {
			Toast.error('Remark is required');
			return;
		}

		updateDocument({ id: firstItem?.id, remark: [ACCEPTED, remark], performed_by_org_id: query?.orgId });
	};

	const handleReject = () => {
		if (!remark) {
			Toast.error('Remark is required');
			return;
		}
		updateDocument({ id: firstItem?.id, remark: [REJECTED, remark], performed_by_org_id: query?.orgId });
	};

	return (
		<Modal
			size="xl"
			placement="center"
			show={show}
			onClose={hide}
		>
			<Modal.Header title="Request High Amount Payment" />
			<Modal.Body>
				<div className={styles.current_payment_row}>
					<div className={styles.current_payment_cols}>
						<span className={styles.heading}>
							Invoice Number
						</span>
						<span className={styles.value}>
							{invoiceNumber}
						</span>
					</div>
					<div className={styles.current_payment_cols}>
						<span className={styles.heading}>
							Shipment ID
						</span>
						<span className={styles.value}>
							{serialNumber}
						</span>
					</div>
					<div className={styles.current_payment_cols}>
						<span className={styles.heading}>
							{invoiceUploadDate}
						</span>
						<span className={styles.value}>
							cogo / 4577
						</span>
					</div>
					<div className={styles.current_payment_cols}>
						<span className={styles.heading}>
							Invoice
						</span>
						<Button
							className={styles.value}
							themeType="link"
							style={{ maxWidth: 'fit-content' }}
							onClick={() => window.open(invoice)}
						>
							View
						</Button>
					</div>
					<div className={styles.current_payment_cols}>
						<span className={styles.heading}>
							Total Invoice Value
						</span>
						<span className={styles.value}>
							{totalInvoiceValue}
						</span>
					</div>
					<div className={styles.current_payment_cols}>
						<span className={styles.heading}>
							Advance Requested Value
						</span>
						<span className={styles.value}>
							{advancedAmountValue}
						</span>
					</div>
				</div>

				{!loading && !isEmpty(data) ? (
					<>
						<div className={styles.payment_history_heading}>
							Supplier Advance Payment History
						</div>
						<div className={styles.payment_history_list}>
							<div className={`${styles.row} ${styles.heading_row}`}>
								<div className={styles.col}>Invoice Number</div>
								<div className={styles.col}>Shipment ID</div>
								<div className={styles.col}>Invoice Upload Date</div>
								<div className={styles.col}>Invoice</div>
								<div className={styles.col}>Total Invoice Value</div>
								<div className={styles.col}>Advance Requested Value</div>
							</div>
							{paymentHistory?.map((item) => (
								<div className={`${styles.row}`} key={item?.jobNumber}>
									<div className={styles.col}>{item?.billNumber || '-'}</div>
									<div className={styles.col}>{item?.jobNumber || '-'}</div>
									<div className={styles.col}>
										{formatDate({
											date       : item?.billDate,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										}) || '___'}

									</div>
									<Button
										className={styles.value}
										themeType="link"
										style={{ maxWidth: 'fit-content' }}
										onClick={() => window.open(item?.billDocumentUrl)}
									>
										View
									</Button>
									<div className={styles.col}>{item?.grandTotal}</div>
									<div className={styles.col}>{item?.advancedAmount}</div>
								</div>
							))}
						</div>
					</>
				) : null}

				{advancePaymentProof
				&& (
					<div>
						<div className={styles.user_input_row}>
							Advance Payment Proof
							<ButtonIcon
								size="sm"
								icon={<IcMDownload />}
								onClick={() => window.open(advancePaymentProof)}
								themeType="primary"
							/>
						</div>

						<div className={styles.form_item_container}>
							<label>Remark</label>
							<Input
								value={remark}
								onChange={(e) => {
									setRemark(e);
								}}
							/>
						</div>
					</div>

				)}

				{!advancePaymentProof && (
					<form>
						<div style={{ display: 'flex' }}>
							<div className={styles.location}>
								<label>Upload Document</label>
								<UploadController
									size="sm"
									control={control}
									name="upload"
									rules={{ required: { value: true, message: 'Upload Supporting document' } }}
								/>
							</div>

							<div className={styles.form_item_container}>
								<label>Remark</label>
								<Input
									value={remark}
									onChange={(e) => {
										setRemark(e);
									}}
								/>
							</div>
						</div>
					</form>
				)}

				<div className={styles.button_wrap}>
					<Button
						className="secondary md"
						style={{ marginRight: '10px' }}
						disabled={taskUpdateLoading}
						onClick={handleReject}
					>
						Reject
					</Button>
					<Button
						className="primary md"
						disabled={taskUpdateLoading}
						onClick={handleSubmit(handleApprove)}
					>
						Aprrove
					</Button>
				</div>

			</Modal.Body>

		</Modal>
	);
}

export default HighAmountRequestModal;
