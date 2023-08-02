import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMInfo,
	IcCError,
	IcMEmail,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateInvoiceStatus from '../../../../../../../../../hooks/useUpdateInvoiceStatus';
import styles from '../styles.module.css';

import KebabContent from './KebabContent';

const EditInvoice = dynamic(() => import('../../../../../../Header/EditInvoice'), { ssr: false });
const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
const OTPVerification = dynamic(() => import('../OTPVerification'), { ssr: false });
const ReviewServices = dynamic(() => import('../ReviewServices'), { ssr: false });
const AmendmentReasons = dynamic(() => import('../AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('../ChangePaymentMode'), { ssr: false });
const SendInvoiceEmail = dynamic(() => import('../SendInvoiceEmail'), { ssr: false });

const DEFAULT_COUNT = 0;
const INVOICE_SERIAL_ID_LESS_THAN = 8;
const INVOICE_STATES_FOR_REVIEW = ['reviewed', 'approved', 'revoked'];
const INVOICE_STATE_FOR_STATUS = ['pending', 'approved'];

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	bfInvoice = {},
}) {
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setOTPModal] = useState(false);
	const showForOldShipments =	shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	// HARD CODING STARTS
	const invoice_serial_id = invoice.serial_id.toString() || '';
	const firstChar = invoice_serial_id[GLOBAL_CONSTANTS.zeroth_index];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < INVOICE_SERIAL_ID_LESS_THAN;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}
	// HARD CODING ENDS

	const refetchAfterCall = () => {
		setShowReview(false);
		refetch();
	};

	const { updateInvoiceStatus = () => {}, loading } = useUpdateInvoiceStatus({
		refetch: refetchAfterCall,
	});

	const handleRefetch = () => {
		refetch();
		salesInvoicesRefetch();
	};

	const underTranslation = () => ((invoice?.status === 'reviewed' && (!bfInvoice?.systemGeneratedProforma
			|| !bfInvoice?.proformaPdfUrl)) || (invoice?.status === 'approved'
			&& !bfInvoice?.systemGeneratedInvoice) ? (
				<div className={styles.pill}>Under Translation</div>) : null);

	const approveButton = () => (
		invoice?.status === 'reviewed' && bfInvoice?.systemGeneratedProforma && bfInvoice?.proformaPdfUrl ? (
			<div className={styles.review_invoice}>
				<Button size="sm" onClick={updateInvoiceStatus} disabled={loading}>
					Approve
				</Button>
			</div>
		) : null
	);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{INVOICE_STATE_FOR_STATUS.includes(invoice.status) && (
							<div className={styles.info_container}>
								{startCase(invoice.status)}
							</div>
						)}
						{!INVOICE_STATES_FOR_REVIEW.includes(invoice.status) && (
							<Button
								size="sm"
								onClick={() => setShowReview(true)}
								disabled={disableMarkAsReviewed}
							>
								Mark as Reviewed
							</Button>
						)}
					</div>
					{underTranslation}
					{approveButton}
					{invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							content={<AmendmentReasons invoice={invoice} />}
						>
							<div className={styles.icon_info_wrapper}>
								<IcCError width={17} height={17} />
							</div>
						</Tooltip>
					) : null}
				</div>
				<div className={styles.actions_wrap}>
					<div className={styles.email_wrapper}>
						<IcMEmail
							onClick={() => setSendEmail(true)}
						/>

						<Tooltip
							placement="bottom"
							theme="light"
							content={(
								<div className={styles.tooltip_child}>
									<div className={styles.flex_row}>
										Proforma email sent :
										{' '}
										{invoice.proforma_email_count || DEFAULT_COUNT}
									</div>

									<div className={cl`${styles.flex_row} ${styles.margin}`}>
										Live email sent:
										{' '}
										{invoice.sales_email_count || DEFAULT_COUNT}
									</div>
								</div>
							)}
						>
							<div className={styles.icon_div}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>
					<KebabContent
						invoice={invoice}
						shipment_data={shipment_data}
						invoiceData={invoiceData}
						isIRNGenerated={isIRNGenerated}
						setIsChangeCurrency={setIsChangeCurrency}
						setShowAddRemarks={setShowAddRemarks}
						setShowChangePaymentMode={setShowChangePaymentMode}
						setIsEditInvoice={setIsEditInvoice}
					/>
				</div>
			</div>

			{(invoice.services || []).length && isEditInvoice && (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			)}

			{showReview && (
				<ReviewServices
					showReview={showReview}
					setShowReview={setShowReview}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			)}

			{isChangeCurrency && (
				<ChangeCurrency
					isChangeCurrency={isChangeCurrency}
					setIsChangeCurrency={setIsChangeCurrency}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			)}

			{showOtpModal && (
				<OTPVerification
					showOtpModal={showOtpModal}
					setOTPModal={setOTPModal}
					invoice={invoice}
					refetch={salesInvoicesRefetch}
					shipment_data={shipment_data}
				/>
			)}

			{showAddRemarks && (
				<AddRemarks
					showAddRemarks={showAddRemarks}
					setShowAddRemarks={setShowAddRemarks}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			)}

			{sendEmail && (
				<SendInvoiceEmail
					show={sendEmail}
					setShow={setSendEmail}
					invoice={invoice}
					refetch={refetch}
				/>
			)}

			{showChangePaymentMode && (
				<ChangePaymentMode
					show={showChangePaymentMode}
					setShow={setShowChangePaymentMode}
					invoice={invoice}
					refetch={refetch}
				/>
			)}
		</div>
	);
}

export default Actions;
