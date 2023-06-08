import { Button, Tooltip, cl } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CONSTANTS from '../../../../../../../../configurations/constant.json';

import EmailInfo from './Components/EmailInfo';
import KebabContent from './Components/KebabContent';
import styles from './styles.module.css';

const AddRemarks = dynamic(() => import('./AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('./ChangeCurrency'), { ssr: false });
const OTPVerification = dynamic(() => import('./OTPVerification'), { ssr: false });
const ReviewServices = dynamic(() => import('./ReviewServices'), { ssr: false });
const AmendmentReasons = dynamic(() => import('./AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });
const SendInvoiceEmail = dynamic(() => import('./SendInvoiceEmail'), { ssr: false });

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];

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
	const showForOldShipments = shipment_data.serial_id <= CONSTANTS.invoice_check_id && invoice.status === 'pending';

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	const invoice_serial_id = invoice?.serial_id?.toString() || '';
	const firstChar = invoice_serial_id[0];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < 8;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}

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
								disabled={disableMarkAsReviewed || invoice?.is_eta_etd}
							>
								Mark as Reviewed
							</Button>
						) : null}

						{invoice?.status === 'reviewed' ? (
							<Button size="sm" onClick={() => setShowOTPModal(true)}>
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
					/>
				</div>
			</div>

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
		</div>
	);
}

export default Actions;
