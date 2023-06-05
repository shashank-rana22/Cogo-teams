import { Button, Popover, Tooltip, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	IcMOverflowDot,
	IcMInfo,
	IcCError,
	IcMEmail,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import NoStyleButton from '@cogoport/surface-modules/common/NoStyleButton';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import ClickableDiv from '../../../../../../ClickableDiv';
import EditInvoice from '../EditInvoice';

import AddCustomerInvoice from './AddCustomerInvoice';
import FillCustomerPortalData from './FillCustomerPortalData';
import styles from './styles.module.css';
import UpdateCustomerInvoice from './UpdateCustomerInvoice';

const AddRemarks = dynamic(() => import('../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../ChangeCurrency'), { ssr: false });
// const OTPVerification = dynamic(() => import('../OTPVerification'), { ssr: false });
// const ReviewServices = dynamic(() => import('../ReviewServices'), { ssr: false });
// const AmendmentReasons = dynamic(() => import('./AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('./ChangePaymentMode'), { ssr: false });
// const SendInvoiceEmail = dynamic(() => import('./SendInvoiceEmail'), { ssr: false });

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];

function Actions({
	invoice = {},
	bfInvoiceRefetch = () => {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	isAuthorized = false,
}) {
	const [show, setShow] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	const [addCustomerInvoice, setAddCustomerInvoice] = useState(false);
	const [updateCustomerInvoice, setUpdateCustomerInvoice] = useState(false);
	const [fillCustomerData, setFillCustomerData] = useState(false);
	const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setShowOTPModal] = useState(false);

	const { shipment_data } = useContext(ShipmentDetailContext);

	const showForOldShipments = shipment_data.serial_id <= 120347 && invoice.status === 'pending';

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
	const firstChar = invoice_serial_id[0];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < 8;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}
	// HARD CODING ENDS

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

	const handleClickInvoice = () => {
		setShow(false);
		setIsEditInvoice(true);
	};

	const handleCustomerInvoice = () => {
		setShow(false);
		setAddCustomerInvoice(true);
	};

	const remarkRender = () => (
		<div className={styles.remarkcontainer}>
			<div className={styles.title}>Invoice Remarks</div>
			<div className={styles.value}>{invoice.remarks}</div>
		</div>
	);

	const handleRefetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const editInvoicesVisiblity =	(shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
	|| isAuthorized;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div style={{ width: '100%' }}>
							<ClickableDiv
								className={styles.text}
								onClick={handleClickInvoice}
							>
								Edit Invoices

							</ClickableDiv>
							<div className={styles.line} />
						</div>
					) : null}

					<div>
						<ClickableDiv
							className={styles.text}
							onClick={handleClickCurrency}
						>
							Change Currency
						</ClickableDiv>
						<div className={styles.line} />
					</div>

					<ClickableDiv
						className={styles.text}
						onClick={handleClickRemarks}
					>
						Add Remarks
					</ClickableDiv>

					{invoice?.billing_address?.trade_party_type === 'self' ? (
						<div>
							<div className={styles.line} />
							<ClickableDiv
								className={styles.text}
								onClick={handleChangePayment}
							>
								Change Payment Mode
							</ClickableDiv>
						</div>
					) : null}
				</>
			) : null}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<ClickableDiv
						className={styles.text}
						onClick={() => window.open(url, '_blank')}
					>
						Exchange Rate Document
					</ClickableDiv>
					<div className={styles.line} />
					<ClickableDiv
						// onClick={handleExchangeRateModal}
						className={styles.text}
					>
						Exchange Rate Sheet

					</ClickableDiv>
					<div>
						<div className={styles.line} />
						<ClickableDiv
							className={styles.text}
							onClick={handleCustomerInvoice}
						>
							{isEmpty(invoice?.customer_ftl_invoice) ? 'Add' : 'Download'}
								&nbsp;
							{['reviewed', 'approved'].includes(invoice?.status) ? '/Generate' : ''}
							Customer Invoice
						</ClickableDiv>
						{['reviewed', 'approved'].includes(invoice?.status) ? (
							<ClickableDiv
								className={styles.text}
								onClick={() => { setShow(false); setUpdateCustomerInvoice(true); }}
							>
								Update Customer Invoice
							</ClickableDiv>
						) : null}
					</div>
				</div>
			))}
			{['reviewed', 'approved'].includes(invoice?.status) ? (
				<div>
					<div className={styles.line} />
					<ClickableDiv
						className={styles.text}
						onClick={() => { setShow(false); setFillCustomerData(true); }}
					>
						Fill Shipment Data For Customer Portal
					</ClickableDiv>
				</div>
			) : null}
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

						{['reviewed', 'approved'].includes(invoice?.status) ? (
							<Button size="sm" onClick={() => setShowOTPModal(true)}>
								Send OTP for Approval
							</Button>
						) : null}
					</div>

					{/* {invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light"
							content={<AmendmentReasons invoice={invoice} />}
						>
							<div className={styles.icon_info_wrapper}>
								<IcCError width={17} height={17} />
							</div>
						</Tooltip>
					) : null} */}
				</div>

				<div className={cl`${styles.actions_wrap} ${styles.actions_wrap_icons}`}>
					<div className={styles.email_wrapper}>
						<IcMEmail
							onClick={() => setSendEmail(true)}
						/>

						<Tooltip
							placement="bottom"
							content={(
								<div className={styles.flex_row_div}>
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
							theme="light"
						>
							<div className={styles.icon_div}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					{(!disableAction || invoice.exchange_rate_document?.length > 0)
					&& invoice.status !== 'revoked' ? (
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
						)
						: (
							<div className={styles.empty_div} />
						)}

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
				</div>
			</div>

			{/* {showReview ? (
				<ReviewServices
					showReview={showReview}
					setShowReview={setShowReview}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null} */}
			{(invoice.services || []).length && isEditInvoice ? (
				<EditInvoice
					show={isEditInvoice}
					onClose={() => setIsEditInvoice(false)}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
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

			{/* {showOtpModal ? (
				<OTPVerification
					showOtpModal={showOtpModal}
					setShowOTPModal={setShowOTPModal}
					invoice={invoice}
					refetch={handleRefetch}
					shipment_data={shipment_data}
				/>
			) : null} */}

			{showAddRemarks ? (
				<AddRemarks
					showAddRemarks={showAddRemarks}
					setShowAddRemarks={setShowAddRemarks}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{/* {sendEmail ? (
				<SendInvoiceEmail
					show={sendEmail}
					setShow={setSendEmail}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null} */}

			{showChangePaymentMode ? (
				<ChangePaymentMode
					show={showChangePaymentMode}
					setShow={setShowChangePaymentMode}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{updateCustomerInvoice ? (
				<UpdateCustomerInvoice
					show={updateCustomerInvoice}
					setShow={setUpdateCustomerInvoice}
					closeModal={() => setUpdateCustomerInvoice(false)}
					refetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			{fillCustomerData ? (
				<FillCustomerPortalData
					show={fillCustomerData}
					closeModal={() => setFillCustomerData(false)}
					handleRefetch={handleRefetch}
					shipmentData={shipment_data}
					invoice={invoice}
				/>
			) : null}

			<AddCustomerInvoice
				show={addCustomerInvoice}
				setShow={setAddCustomerInvoice}
				closeModal={() => setAddCustomerInvoice(false)}
				handleRefetch={handleRefetch}
				invoice={invoice}
				shipmentData={shipment_data}
			/>

			<NoStyleButton>Edit Invoices</NoStyleButton>

		</div>
	);
}

export default Actions;
