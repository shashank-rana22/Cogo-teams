import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCError, IcMInfo } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmailInfo from './Components/EmailInfo';
import KebabContent from './Components/KebabContent';
import styles from './styles.module.css';

const EditInvoice = dynamic(() => import('../../../../../Header/EditInvoice'), { ssr: false });
const AddRemarks = dynamic(() => import('./AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('./ChangeCurrency'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });
const ReviewServices = dynamic(() => import('./ReviewServices'), { ssr: false });
const OTPVerification = dynamic(() => import('./OTPVerification'), { ssr: false });
const AmendmentReasons = dynamic(() => import('./AmendmentReasons'), { ssr: false });
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
	const [showModal, setShowModal] = useState('');

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

	const remarkRender = () => (
		<div className={styles.remark_container}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const onModalClose = () => setShowModal('');

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
								onClick={() => setShowModal('show_review')}
								themeType="accent"
								disabled={disableMarkAsReviewed || invoice?.is_eta_etd}
							>
								Mark as Reviewed
							</Button>
						) : null}

						{invoice?.status === 'reviewed' ? (
							<Button size="sm" onClick={() => setShowModal('otp_verification')}>
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
					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							content={remarkRender()}
						>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="#DDEBC0" />
							</div>
						</Tooltip>
					) : null}

					<EmailInfo invoice={invoice} setSendEmail={() => setShowModal('send_invoice_email')} />

					<KebabContent
						invoice={invoice}
						shipment_data={shipment_data}
						invoiceData={invoiceData}
						isIRNGenerated={isIRNGenerated}
						setShowModal={setShowModal}
					/>
				</div>
			</div>

			{(invoice.services || []).length && showModal === 'edit_invoice' ? (
				<EditInvoice
					show={showModal === 'edit_invoice'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'change_currency' ? (
				<ChangeCurrency
					show={showModal === 'change_currency'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'add_remarks' ? (
				<AddRemarks
					show={showModal === 'add_remarks'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'change_payment_mode' ? (
				<ChangePaymentMode
					show={showModal === 'change_payment_mode'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'show_review' ? (
				<ReviewServices
					show={showModal === 'show_review'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'opt_verification' ? (
				<OTPVerification
					show={showModal === 'opt_verification'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'send_invoice_email' ? (
				<SendInvoiceEmail
					show={showModal === 'send_invoice_email'}
					onClose={onModalClose}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}
		</div>
	);
}

export default Actions;
