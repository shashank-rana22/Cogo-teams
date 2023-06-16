import { Button, ButtonIcon, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { useGetAdvancedPaymentHistory } from '../../../../../hook/useGetAdvancedPaymentHistory';
import useShipmentDocument from '../../../../../hook/useShipmentDocument';

import styles from './styles.module.css';

function HighAmountRequestModal({ invoiceData, modalData }) {
	const {
		invoiceNumber,
		serialNumber,
		invoiceUploadDate,
		invoice,
		totalInvoiceValue,
		advancedAmountValue,
		sellerOrganizationId,
		outstandingDocument,
	} = invoiceData || {};

	const { show, hide } = modalData;

	const { loading, data } = useGetAdvancedPaymentHistory({ sellerOrganizationId });
	const { data: documentData, loading:documentLoading } = useShipmentDocument(serialNumber);

	const paymentHistory = data;

	console.log({ documentData });

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

				<div className={styles.user_input_row}>
					Outstanding Proforma Approval
					<ButtonIcon
						size="sm"
						icon={<IcMDownload />}
						disabled={documentLoading}
						onClick={() => window.open(outstandingDocument)}
						themeType="primary"
					/>
				</div>

			</Modal.Body>

		</Modal>
	);
}

export default HighAmountRequestModal;
