import { Button, Popover, Tooltip, cl } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMInfo,
	IcCError,
	IcMEmail,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateInvoiceStatus from '../../../../../../../../hooks/useUpdateInvoiceStatus';
import styles from '../styles.module.css';

const AddRemarks = dynamic(() => import('../../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../../ChangeCurrency'), { ssr: false });
const OTPVerification = dynamic(() => import('../../OTPVerification'), { ssr: false });
const ReviewServices = dynamic(() => import('../../ReviewServices'), { ssr: false });
const AmendmentReasons = dynamic(() => import('../AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('../ChangePaymentMode'), { ssr: false });
const SendInvoiceEmail = dynamic(() => import('../SendInvoiceEmail'), { ssr: false });

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	bfInvoice = {},
}) {
	const [show, setShow] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setOTPModal] = useState(false);
	const showForOldShipments =	shipment_data.serial_id <= 120347 && invoice.status === 'pending';

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
	const firstChar = invoice_serial_id[0];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < 8;

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

	const handleClickCurrency = () => {
		setIsChangeCurrency(true);
		setShow(false);
	};

	const handleClickRemarks = () => {
		setShow(false);
		setShowAddRemarks(true);
	};

	const handleChangePayment = () => {
		setShow(false);
		setShowChangePaymentMode(true);
	};

	const remarkRender = (
		<div className={styles.remark_container}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const handleRefetch = () => {
		refetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					<div>
						<div
							role="button"
							tabIndex={0}
							className={styles.text}
							onClick={handleClickCurrency}
						>
							Change Currency
						</div>
						<div className={styles.line} />
					</div>
					<div
						role="button"
						tabIndex={0}
						className={styles.text}
						onClick={handleClickRemarks}
					>
						Add Remarks
					</div>
					<div>
						<div className={styles.line} />
						<div
							role="button"
							tabIndex={0}
							className={styles.text}
							onClick={handleChangePayment}
						>
							Change Payment Mode
						</div>
					</div>
				</>
			) : null}
			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<div
						role="button"
						tabIndex={0}
						className={styles.text}
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{['pending', 'approved'].includes(invoice.status) ? (
							<div className={styles.info_container}>
								{startCase(invoice.status)}
							</div>
						) : null}
						{!['reviewed', 'approved', 'revoked'].includes(invoice.status) ? (
							<Button
								size="sm"
								onClick={() => setShowReview(true)}
								disabled={disableMarkAsReviewed}
							>
								Mark as Reviewed
							</Button>
						) : null}
					</div>
					{(invoice?.status === 'reviewed'
						&& (!bfInvoice?.systemGeneratedProforma
							|| !bfInvoice?.proformaPdfUrl))
					|| (invoice?.status === 'approved'
						&& !bfInvoice?.systemGeneratedInvoice) ? (
							<div className={styles.pill}>Under Translation</div>
						) : null}
					{invoice?.status === 'reviewed'
						&& bfInvoice?.systemGeneratedProforma
						&& bfInvoice?.proformaPdfUrl && (
							<div className={styles.review_invoice}>
								<Button
									size="sm"
									onClick={updateInvoiceStatus}
									disabled={loading}
								>
									Approve
								</Button>
							</div>
					)}
					{invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							interactive
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
							interactive
							placement="bottom"
							theme="light"
							content={(
								<div className={styles.tooltip_child}>
									<div className={styles.flex_row}>
										Proforma email sent :
										&nbsp;
										{invoice.proforma_email_count || 0}
									</div>

									<div className={cl`${styles.flex_row} ${styles.margin}`}>
										Live email sent:
										&nbsp;
										{invoice.sales_email_count || 0}
									</div>
									<div className={cl`${styles.flex_row} ${styles.utr_details}`}>
										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											UTR Number:
											&nbsp;
											{invoice?.sales_utr?.utr_number || ''}
										</div>
										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											Status:
											&nbsp;
											{invoice?.sales_utr?.status || ''}
										</div>
									</div>
								</div>
							)}
						>
							<div className={styles.info_icon}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					{!disableAction || invoice.exchange_rate_document?.length > 0 ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<div
								role="button"
								tabIndex={0}
								className={styles.icon_more_wrapper}
								onClick={() => setShow(!show)}
							>
								<IcMOverflowDot />
							</div>
						</Popover>
					) : (
						<div className={styles.empty_div} />
					)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							interactive
							content={remarkRender}
						>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="yellow" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{showReview ? (
				<ReviewServices
					showReview={showReview}
					setShowReview={setShowReview}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{isChangeCurrency ? (
				<ChangeCurrency
					isChangeCurrency={isChangeCurrency}
					setIsChangeCurrency={setIsChangeCurrency}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showOtpModal ? (
				<OTPVerification
					showOtpModal={showOtpModal}
					setOTPModal={setOTPModal}
					invoice={invoice}
					refetch={salesInvoicesRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showAddRemarks ? (
				<AddRemarks
					showAddRemarks={showAddRemarks}
					setShowAddRemarks={setShowAddRemarks}
					invoice={invoice}
					refetch={handleRefetch}
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
