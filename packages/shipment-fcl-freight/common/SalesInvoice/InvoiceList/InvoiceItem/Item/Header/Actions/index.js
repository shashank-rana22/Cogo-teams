// import { useSelector } from '@cogo/store';
import { Button, Popover, Tooltip } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMInfo,
	IcCError,
	IcMEmail,
} from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import AddRemarks from '../AddRemarks';
import ChangeCurrency from '../ChangeCurrency';
import EditInvoice from '../EditInvoice';
import ExchangeRateModal from '../ExchangeRateModal';
import OTPVerificationModal from '../OTPVerificationModal';
import ReviewServices from '../ReviewServices';

import AddCustomerInvoice from './AddCustomerInvoice';
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
	invoicesList = [],
}) {
	const [show, setShow] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setOTPModal] = useState(false);
	const [showExchangeRate, setExchangeRate] = useState(false);
	const [addCustomerInvoice, setAddCustomerInvoice] = useState(false);
	const showForOldShipments =		shipment_data.serial_id <= 120347 && invoice.status === 'pending';

	// const user_data = useSelector(({ profile }) => profile || {});

	let disableAction = showForOldShipments
		? isIRNGenerated
		: ['reviewed', 'approved'].includes(invoice.status)
		|| isEmpty(invoiceData.invoice_trigger_date);

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	// HARD CODING STARTS
	// const invoice_serial_id = invoice?.serial_id.toString() || '';
	// const firstChar = invoice_serial_id[0];

	// const isInvoiceBefore20Aug2022 =		firstChar !== '1' || invoice_serial_id.length < 8;

	let disableMarkAsReviewed = disableAction;
	// if (showForOldShipments) {
	// 	disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	// }
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

	const handleCustomerInvoice = () => {
		setShow(false);
		setAddCustomerInvoice(true);
	};

	const handleExchangeRateModal = () => {
		setShow(false);
		setExchangeRate(true);
	};

	const remarkRender = () => (
		<div className={styles.RemarkContainer}>
			<div className={styles.Title}>Invoice Remarks</div>
			<div className={styles.Value}>{invoice.remarks}</div>
		</div>
	);

	const handleRefetch = () => {
		refetch();
		salesInvoicesRefetch();
	};

	// goods_transport_agency
	let isLTLPrepaid = false;
	const isFtl =		shipment_data.shipment_type === 'ftl_freight'
		&& shipment_data.source === 'contract';

	if (
		['ftl_freight', 'ltl_freight', 'haulage_freight'].includes(
			shipment_data.shipment_type,
		)
	) {
		if (invoicesList.length === 0) {
			disableMarkAsReviewed = true;
		}
		if (shipment_data.shipment_type === 'ftl_freight') {
			disableMarkAsReviewed = shipment_data.state !== 'completed';

			const deliveryDatePresent =				shipment_data.all_services?.[0]?.delivery_date;

			if (
				deliveryDatePresent
				|| invoiceData.invoicing_parties?.[0]?.billing_address?.tax_mechanism
					=== 'goods_transport_agency'
			) {
				disableMarkAsReviewed = false;
			}
		}
		if (shipment_data?.payment_term && invoice?.sales_utr) {
			isLTLPrepaid = true;
		}
	}

	// let editInvoicesVisiblity =		(shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	// 	|| user_data.email === 'ajeet@cogoport.com';

	// if (shipment_data?.shipment_type === 'ltl_freight') {
	// 	editInvoicesVisiblity =			editInvoicesVisiblity && invoice?.sales_utr?.status !== 'approved';
	// }

	// if (shipment_data?.shipment_type === 'air_freight') {
	// 	editInvoicesVisiblity =			shipment_data?.is_cogo_assured !== true && !invoice?.is_igst;
	// }

	const commonActions = invoice.status !== 'approved' && !isFtl && !disableAction;

	const content = (
		<div className={styles.DialogBox}>
			{/* {commonActions ? ( */}
			{/* {editInvoicesVisiblity ? ( */}
			<div style={{ width: '100%' }}>
				<div
					role="button"
					tabIndex={0}
					className={styles.Text}
					onClick={handleClickInvoice}
				>
					Edit Invoices

				</div>
				<div className={styles.Line} />
			</div>
			{/* ) : null} */}

			<div>
				<div
					role="button"
					tabIndex={0}
					className={styles.Text}
					onClick={handleClickCurrency}
				>
					Change Currency

				</div>
				<div className={styles.Line} />
			</div>

			<div
				role="button"
				tabIndex={0}
				className={styles.Text}
				onClick={handleClickRemarks}
			>
				Add Remarks

			</div>

			{/* {invoice?.billing_address?.trade_party_type === 'self' ? ( */}
				<div>
					<div className={styles.Line} />

					<div
						role="button"
						tabIndex={0}
						className={styles.Text}
						onClick={handleChangePayment}
					>
						Change Payment Mode

					</div>
				</div>
			{/* ) : null} */}
			{/* ) : null} */}

			{/* {(invoice.exchange_rate_document || []).map((url) => ( */}
			<div>
				{!commonActions ? <div className={styles.Line} /> : null}

				<div
					role="button"
					tabIndex={0}
					className={styles.Text}
				// onClick={() => window.open(url, '_blank')}
				>
					Exchange Rate Document
				</div>
			</div>
			{/* ))} */}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{/* {invoice.status ? ( */}
						<div className={styles.info_container}>
							{startCase(invoice.status) || 'Pending'}
						</div>
						{/* ) : null} */}

						{!['reviewed', 'approved', 'revoked'].includes(invoice.status) ? (
							<Button
								className="primary sm"
								onClick={() => setShowReview(true)}
								themeType="accent"
								// disabled={disableMarkAsReviewed || invoice?.is_eta_etd}
							>
								Mark as Reviewed
							</Button>
						) : null}

						{invoice?.status === 'reviewed' ? (
							<Button className="primary sm" onClick={() => setOTPModal(true)}>
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
									{isLTLPrepaid && (
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
									)}
								</div>
							)}
							theme="light"
						>
							<div style={{ margin: '4px 0 0 10px', cursor: 'pointer' }}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					{/* {(!disableAction || invoice.exchange_rate_document?.length > 0)
					&& invoice.status !== 'revoked' ? ( */}
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
					{/* ) : (
							<div style={{ width: '34px' }} />
						)} */}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							interactive
							content={remarkRender()}
						>
							<div className={styles.icon_more_wrapper}>
								<IcMInfo fill="yellow" />
							</div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{/* {(invoice.services || []).length && isEditInvoice ? ( */}
			<EditInvoice
				show={isEditInvoice}
				onClose={() => setIsEditInvoice(false)}
				invoice={invoice}
				refetch={handleRefetch}
				shipment_data={shipment_data}
			/>
			{/* ) : null} */}

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
					setOTPModal={setOTPModal}
					invoice={invoice}
					refetch={salesInvoicesRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showExchangeRate ? (
				<ExchangeRateModal
					showExchangeRate={showExchangeRate}
					setExchangeRate={setExchangeRate}
					invoice={invoice}
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
			{addCustomerInvoice ? (
				<AddCustomerInvoice
					show={addCustomerInvoice}
					closeModal={() => setAddCustomerInvoice(false)}
					handleRefetch={handleRefetch}
					invoice={invoice}
					shipment_data={shipment_data}
				/>
			) : null}
		</div>
	);
}

export default Actions;
