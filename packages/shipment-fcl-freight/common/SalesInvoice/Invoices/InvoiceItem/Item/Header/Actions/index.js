import { Button, Popover, Tooltip } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMInfo,
	IcCError,
	IcMEmail,
} from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import AddRemarks from '../AddRemarks';
import ChangeCurrency from '../ChangeCurrency';
import EditInvoice from '../EditInvoice';
import OTPVerificationModal from '../OTPVerificationModal';
import ReviewServices from '../ReviewServices';

import AmendmentReasons from './AmendmentReasons';
import ChangePaymentMode from './ChangePaymentMode';
import SendInvoiceEmail from './SendInvoiceEmail';
import styles from './styles.module.css';

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
}) {
	const [show, setShow] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setShowOTPModal] = useState(false);
	const showForOldShipments = shipment_data.serial_id <= 120347 && invoice.status === 'pending';

	const user_data = useSelector(({ profile }) => profile || {});

	let disableAction = showForOldShipments
		? isIRNGenerated
		: ['reviewed', 'approved'].includes(invoice.status)
		|| isEmpty(invoiceData.invoice_trigger_date);

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	// HARD CODING STARTS
	const invoice_serial_id = invoice?.serial_id.toString() || '';
	const firstChar = invoice_serial_id[0];

	const isInvoiceBefore20Aug2022 =		firstChar !== '1' || invoice_serial_id.length < 8;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}
	// HARD CODING ENDS

	const handleClickInvoice = () => {
		setShow(false);
		setIsEditInvoice(true);
	};

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

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const handleRefetch = () => {
		refetch();
		salesInvoicesRefetch();
	};

	// goods_transport_agency
	const editInvoicesVisiblity =	(shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
		|| user_data.email === 'ajeet@cogoport.com';

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div style={{ width: '100%' }}>
							<div
								role="button"
								tabIndex={0}
								className={styles.text}
								onClick={handleClickInvoice}
							>
								Edit Invoices

							</div>
							<div className={styles.line} />
						</div>
					) : null}

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

					{invoice?.billing_address?.trade_party_type === 'self' ? (
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
					) : null}
				</>
			) : null}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{!commonActions ? <div className={styles.line} /> : null}
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
						{invoice.status ? (
							<div className={styles.info_container}>
								{startCase(invoice.status)}
							</div>
						) : null}

						{!['reviewed', 'approved', 'revoked'].includes(invoice.status) ? (
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
							style={{ cursor: 'pointer', color: '#F68B21' }}
							onClick={() => setSendEmail(true)}
						/>

						<Tooltip
							interactive
							placement="bottom"
							content={(
								<div style={{ fontSize: '10px', color: '#333333' }}>
									<div className={styles.flex_row}>
										Proforma email sent :
										{' '}
										{invoice.proforma_email_count || 0}
									</div>

									<div className={styles.flex_row}>
										Live email sent:
										{' '}
										{invoice.sales_email_count || 0}
									</div>
									<div className={styles.flex_row}>
										<div className={styles.flex_row}>
											UTR Number:
											{' '}
											{invoice?.sales_utr?.utr_number || ''}
										</div>
										<div className={styles.flex_row}>
											Status:
											{' '}
											{invoice?.sales_utr?.status || ''}
										</div>
									</div>
								</div>
							)}
							theme="light"
						>
							<div style={{ margin: '4px 0 0 10px', cursor: 'pointer' }}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					{(!disableAction || invoice.exchange_rate_document?.length > 0)
					&& invoice.status !== 'revoked' ? (
						<Popover
							interactive
							placement="left"
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
						)
						: (
							<div style={{ width: '34px' }} />
						)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							interactive
							content={remarkRender()}
						>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="#DDEBC0" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{(invoice.services || []).length && isEditInvoice ? (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

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
				<OTPVerificationModal
					showOtpModal={showOtpModal}
					setShowOTPModal={setShowOTPModal}
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
