import { Button, Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
import ClickableDiv from '../../../../../../../ClickableDiv';
import styles from '../styles.module.css';

const AddRemarks = dynamic(() => import('../../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../../ChangeCurrency'), { ssr: false });
const OTPVerification = dynamic(() => import('../../OTPVerification'), { ssr: false });
const ReviewServices = dynamic(() => import('../../ReviewServices'), { ssr: false });
const AmendmentReasons = dynamic(() => import('../AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('../ChangePaymentMode'), { ssr: false });
const SendInvoiceEmail = dynamic(() => import('../SendInvoiceEmail'), { ssr: false });

const INVOICE_SERAIL_ID_LESS_THAN = 8;
const DEFAULT_COUNT = 0;
const EMPTY_ARRAY_LENGTH = 0;
const INVOICE_SERIAL_FIRST_CHAR = 0;

const DISABLE_STATUS = ['reviewed', 'approved'];
const REVIEW_STATUS = ['reviewed', 'approved', 'revoked'];
const INVOICE_TAG_STATUS = ['pending', 'approved'];

// eslint-disable-next-line max-lines-per-function
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
	const [showModal, setShowModal] = useState(false);

	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setOTPModal] = useState(false);

	const showForOldShipments =	shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

	const disableActionCondition = DISABLE_STATUS.includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	// HARD CODING STARTS
	const invoice_serial_id = invoice.serial_id.toString() || '';
	const firstChar = invoice_serial_id[INVOICE_SERIAL_FIRST_CHAR];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < INVOICE_SERAIL_ID_LESS_THAN;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}
	// HARD CODING ENDS

	const refetchAfterCall = () => {
		setShowReview(false);
		refetch();
	};

	const { updateInvoiceStatus = () => {}, loading } = useUpdateInvoiceStatus({ refetch: refetchAfterCall });

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

	const underTranslation = () => ((invoice?.status === 'reviewed'
	&& (!bfInvoice?.systemGeneratedProforma || !bfInvoice?.proformaPdfUrl))
		|| (invoice?.status === 'approved' && !bfInvoice?.systemGeneratedInvoice) ? (
			<div className={styles.pill}>Under Translation</div>
		) : null);

	const approveButton = () => (invoice?.status === 'reviewed'
	&& bfInvoice?.systemGeneratedProforma && bfInvoice?.proformaPdfUrl ? (
		<div className={styles.review_invoice}>
			<Button
				size="sm"
				onClick={updateInvoiceStatus}
				disabled={loading}
			>
				Approve
			</Button>
		</div>
		) : null
	);

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					<div>
						<ClickableDiv className={styles.text} onClick={handleClickCurrency}>
							Change Currency
						</ClickableDiv>

						<div className={styles.line} />
					</div>

					<ClickableDiv className={styles.text} onClick={handleClickRemarks}>
						Add Remarks
					</ClickableDiv>

					<div>
						<div className={styles.line} />

						<ClickableDiv className={styles.text} onClick={handleChangePayment}>
							Change Payment Mode
						</ClickableDiv>
					</div>
				</>
			) : null}
			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<ClickableDiv className={styles.text} onClick={() => window.open(url, '_blank')}>
						Exchange Rate Document
					</ClickableDiv>
				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{INVOICE_TAG_STATUS.includes(invoice.status) ? (
							<div className={styles.info_container}>{startCase(invoice.status)}</div>
						) : null}

						{!REVIEW_STATUS.includes(invoice.status) ? (
							<Button
								size="sm"
								onClick={() => setShowReview(true)}
								disabled={disableMarkAsReviewed}
							>
								Mark as Reviewed
							</Button>
						) : null}
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
						<IcMEmail onClick={() => setSendEmail(true)} />

						<Tooltip
							placement="bottom"
							theme="light"
							content={(
								<div className={styles.tooltip_child}>
									<div className={styles.flex_row}>
										{`Proforma email sent : ${invoice.proforma_email_count || DEFAULT_COUNT}`}
									</div>

									<div className={cl`${styles.flex_row} ${styles.margin}`}>
										{`Live email sent: ${invoice.sales_email_count || DEFAULT_COUNT}`}
									</div>

									<div className={cl`${styles.flex_row} ${styles.utr_details}`}>
										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											{`UTR Number: ${invoice?.sales_utr?.utr_number || ''}`}
										</div>

										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											{`Status: ${invoice?.sales_utr?.status || ''}`}
										</div>
									</div>
								</div>
							)}
						>
							<div className={styles.icon_div}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					{!disableAction || invoice.exchange_rate_document?.length > EMPTY_ARRAY_LENGTH ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<ClickableDiv
								className={styles.icon_more_wrapper}
								onClick={() => setShow(!show)}
							>
								<IcMOverflowDot />
							</ClickableDiv>
						</Popover>
					) : (
						<div className={styles.empty_div} />
					)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							content={remarkRender}
						>
							<div className={styles.icon_more_wrapper}><IcMInfo fill="yellow" /></div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{showReview ? (
				<ReviewServices
					show={showReview}
					setShow={setShowReview}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'isChangeCurrency' ? (
				<ChangeCurrency
					show={showModal}
					setShowModal={setShowModal}
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
