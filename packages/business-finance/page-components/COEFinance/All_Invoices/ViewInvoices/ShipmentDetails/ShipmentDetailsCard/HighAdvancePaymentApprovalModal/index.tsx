import { Toast, Button, ButtonIcon, Modal, Input } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateShipmentDocument from '../../../../../hook/useCreateShipmentDocument';
import { useGetAdvancedPaymentHistory } from '../../../../../hook/useGetAdvancedPaymentHistory';
import useUpdateShipmentDocuments from '../../../../../hook/useUpdateShipmentDocument';

import styles from './styles.module.css';

const ACCEPTED = 'accepted';
const REJECTED = 'rejected';
const HIGH_ADVANCE_PAYMENT_PROOF = 'high_advance_payment_proof';

function HighAmountRequestModal({
	invoiceData, modalData,
	serviceProviderOrgId,
	shipmentData = { list: [] }, refetchShipmentDocument = () => {},
}) {
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

	const [currShipmentData = {}] = shipmentData?.list || [];
	const { document_url: advancePaymentProof } = advancedPaymentObj || {};

	const { show, hide } = modalData;

	const [remark, setRemark] = useState('');

	const [advanceAmount, setadvanceAmount] = useState(0);

	const { loading, data } = useGetAdvancedPaymentHistory({ sellerOrganizationId });

	const { taskUpdateLoading, updateDocument } = useUpdateShipmentDocuments({});

	const { docLoading, apiTrigger } = useCreateShipmentDocument({});

	const paymentHistory = data?.filter((item) => item?.billNumber !== invoiceNumber);

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

		if (!advancePaymentProof) {
			const { id } = currShipmentData || {};
			const payload = {
				shipment_id        : id,
				uploaded_by_org_id : serviceProviderOrgId,
				document_type      : HIGH_ADVANCE_PAYMENT_PROOF,
				documents          : [{
					data: {
						invoice_number : invoiceNumber,
						url            : val?.upload?.finalUrl,
					},
					remarks      : [ACCEPTED, remark],
					file_name    : val?.upload?.fileName,
					document_url : val?.upload?.finalUrl,
				}],
			};

			apiTrigger(payload, () => { hide(); refetchShipmentDocument(); });
			return;
		}

		updateDocument({
			id                  : advancedPaymentObj?.id,
			remarks             : [ACCEPTED, remark],
			performed_by_org_id : serviceProviderOrgId,
		}, () => { refetchShipmentDocument(); hide(); });
	};

	const handleReject = () => {
		if (!remark) {
			Toast.error('Remark is required');
			return;
		}
		if (!advanceAmount) {
			Toast.error('Advance Amount is required');
			return;
		}
		if (+advancedAmountValue === +advanceAmount) {
			Toast.error('Pls Change Advance amount , Cannot be same as previous Advance Amount');
			return;
		}

		const advancePaymentObjData = JSON.parse(advancedPaymentObj.data);

		updateDocument({
			id                  : advancedPaymentObj?.id,
			remarks             : [REJECTED, remark],
			performed_by_org_id : serviceProviderOrgId,
			data                : {
				...advancePaymentObjData,
				updated_advanced_amount: advanceAmount,
			},

		}, () => { refetchShipmentDocument(); hide(); });
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
							Invoice Upload Date
						</span>
						<span className={styles.value}>
							{formatDate({
								date       : invoiceUploadDate,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							}) || '___'}
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

				{!loading && !isEmpty(paymentHistory) ? (
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
					<div style={{ display: 'flex', alignItems: 'center' }}>
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
							<label>Remark*</label>
							<Input
								value={remark}
								onChange={(e) => {
									setRemark(e);
								}}
							/>
						</div>
						<div className={styles.form_item_container}>
							<label>Advance Amount</label>
							<Input
								type="number"
								value={advanceAmount}
								onChange={(e) => {
									setadvanceAmount(e);
								}}
							/>
						</div>

					</div>

				)}

				{!advancePaymentProof && (
					<form>
						<div style={{ display: 'flex' }}>
							<div className={styles.location}>
								<label>Upload Document*</label>
								<UploadController
									size="sm"
									control={control}
									name="upload"
									rules={{ required: { value: true, message: 'Upload Supporting document' } }}
								/>
							</div>

							<div className={styles.form_item_container}>
								<label>Remark*</label>
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
					{advancePaymentProof ? (
						<Button
							className="secondary md"
							style={{ marginRight: '10px' }}
							disabled={taskUpdateLoading || docLoading}
							onClick={handleReject}
						>
							Reject
						</Button>
					) : null}
					<Button
						className="primary md"
						disabled={taskUpdateLoading || docLoading}
						onClick={advancePaymentProof ? handleApprove : handleSubmit(handleApprove)}
					>
						Aprrove
					</Button>
				</div>

			</Modal.Body>

		</Modal>
	);
}

export default HighAmountRequestModal;
