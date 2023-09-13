import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCError } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmailInfo from './Components/EmailInfo';
import KebabContent from './Components/KebabContent';
import EditInvoice from './EditInvoice';
import ExchangeRateModal from './ExchangeRateModal';
import styles from './styles.module.css';

const AddRemarks = dynamic(() => import('./AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('./ChangeCurrency'), { ssr: false });
const OTPVerification = dynamic(() => import('./OTPVerification'), { ssr: false });
const ReviewServices = dynamic(() => import('./ReviewServices'), { ssr: false });
const AmendmentReasons = dynamic(() => import('./AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });
const SendInvoiceEmail = dynamic(() => import('./SendInvoiceEmail'), { ssr: false });

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];
const INVOICE_SERIAL_ID_LESS_THAN = 8;

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
}) {
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setShowOTPModal] = useState(false);
	const [showExchangeRate, setExchangeRate] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
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
	const invoice_serial_id = invoice?.serial_id?.toString() || '';
	const firstChar = invoice_serial_id[GLOBAL_CONSTANTS.zeroth_index];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < INVOICE_SERIAL_ID_LESS_THAN;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}
	// HARD CODING ENDS

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{invoice.status ? (
							<div className={styles.info_container}>
								{startCase(invoice.status)}
							</div>
						) : null}

						{!INVOICE_STATUS.includes(invoice.status) ? (
							<Button
								size="sm"
								onClick={() => setShowReview(true)}
								themeType="accent"
								disabled={disableMarkAsReviewed
									|| invoice?.is_eta_etd
									|| shipment_data?.is_job_closed_financially}
							>
								Mark as Reviewed
							</Button>
						) : null}

						{invoice?.status === 'reviewed' ? (
							<Button
								size="sm"
								onClick={() => setShowOTPModal(true)}
								disabled={shipment_data?.is_job_closed_financially}
							>
								Send OTP for Approval
							</Button>
						) : null}
					</div>

					{invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light"
							content={<AmendmentReasons invoice={invoice} />}
						>
							<div className={styles.icon_info_wrapper}>
								<IcCError width={17} height={17} />
							</div>
						</Tooltip>
					) : null}
				</div>
				<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
					<EmailInfo invoice={invoice} setSendEmail={setSendEmail} />
					<KebabContent
						invoice={invoice}
						shipment_data={shipment_data}
						invoiceData={invoiceData}
						isIRNGenerated={isIRNGenerated}
						setIsChangeCurrency={setIsChangeCurrency}
						setShowAddRemarks={setShowAddRemarks}
						setShowChangePaymentMode={setShowChangePaymentMode}
						setExchangeRate={setExchangeRate}
						setIsEditInvoice={setIsEditInvoice}
					/>
				</div>
			</div>

			{(invoice.services || []).length && isEditInvoice ? (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={refetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showReview ? (
				<ReviewServices
					showReview={showReview}
					setShowReview={setShowReview}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{isChangeCurrency ? (
				<ChangeCurrency
					isChangeCurrency={isChangeCurrency}
					setIsChangeCurrency={setIsChangeCurrency}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showOtpModal ? (
				<OTPVerification
					showOtpModal={showOtpModal}
					setShowOTPModal={setShowOTPModal}
					invoice={invoice}
					refetch={refetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showAddRemarks ? (
				<AddRemarks
					showAddRemarks={showAddRemarks}
					setShowAddRemarks={setShowAddRemarks}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{sendEmail ? (
				<SendInvoiceEmail
					show={sendEmail}
					setShow={setSendEmail}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showChangePaymentMode ? (
				<ChangePaymentMode
					show={showChangePaymentMode}
					setShow={setShowChangePaymentMode}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showExchangeRate ? (
				<ExchangeRateModal
					showExchangeRate={showExchangeRate}
					setExchangeRate={setExchangeRate}
					invoice={invoice}
				/>
			) : null}
		</div>
	);
}

export default Actions;
