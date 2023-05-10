import ChangeCurrency from '@cogo/bookings/commons/ChangeCurrency';
import { useSelector } from '@cogo/store';
import { Button, Popover, ToolTip } from '@cogoport/front/components/admin';
import { isEmpty, startCase } from '@cogoport/front/utils';
import {
	IcMOverflowDot,
	IcMInfo,
	IcCError,
	// IcMEmail,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateInvoiceStatus from '../../../../../../../../hooks/useUpdateInvoiceStatus';
import AddRemarks from '../../AddRemarks';
import EditInvoice from '../../EditInvoice';
import OTPVerificationModal from '../../OTPVerificationModal';
import ReviewServices from '../../ReviewServices';
import AmendmentReasons from '../AmendmentReasons';
// import SendInvoiceEmail from '../SendInvoiceEmail';
import ChangePaymentMode from '../ChangePaymentMode';
import RejectRequest from '../RejectRequest';
import {
	Container,
	IconMoreWrapper,
	InfoContainer,
	IconInfoWrapper,
	DialogBox,
	Text,
	Statuses,
	Line,
	RemarkContainer,
	Title,
	Value,
	// EmailWrapper,
	// FlexRow,
	ActionsWrap,
	MainContainer,
	Pill,
	ReviewInvoice,
} from '../styles';

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	invoicesList = [],
	bfInvoice = {},
}) {
	const [show, setShow] = useState(false);
	const [isEditInvoice, setIsEditInvoice] = useState(false);
	const [isChangeCurrency, setIsChangeCurrency] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showAddRemarks, setShowAddRemarks] = useState(false);
	const [showChangePaymentMode, setShowChangePaymentMode] = useState(false);
	// const [sendEmail, setSendEmail] = useState(false);
	const [showOtpModal, setOTPModal] = useState(false);
	const [rejectInvoice, setRejectInvoice] = useState(false);
	const showForOldShipments =		shipment_data.serial_id <= 120347 && invoice.status === 'pending';

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	let disableAction = showForOldShipments
		? isIRNGenerated
		: ['reviewed', 'approved'].includes(invoice.status)
		  || isEmpty(invoiceData.invoice_trigger_date);

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	// HARD CODING STARTS
	const invoice_serial_id = invoice.serial_id.toString() || '';
	const firstChar = invoice_serial_id[0];

	const isInvoiceBefore20Aug2022 =		firstChar !== '1' || invoice_serial_id.length < 8;

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}
	// HARD CODING ENDS

	const { updateInvoiceStatus, loading } = useUpdateInvoiceStatus({
		invoice,
		refetch,
		status: 'approved',
	});

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
		<RemarkContainer>
			<Title>Invoice Remarks</Title>
			<Value>{invoice.remarks}</Value>
		</RemarkContainer>
	);

	const handleRefetch = () => {
		refetch();
		salesInvoicesRefetch();
	};

	// goods_transport_agency
	// const isLTLPrepaid = false;
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
		// if (shipment_data?.payment_term && invoice?.sales_utr) {
		// 	isLTLPrepaid = true;
		// }
	}

	let editInvoicesVisiblity =		(shipment_data?.is_cogo_assured !== true && !invoice?.is_igst)
		|| user_data.email === 'ajeet@cogoport.com';

	if (shipment_data?.shipment_type === 'ltl_freight') {
		editInvoicesVisiblity =			editInvoicesVisiblity && invoice?.sales_utr?.status !== 'approved';
	}

	const commonActions =		invoice.status !== 'approved' && !isFtl && !disableAction;

	const content = (
		<DialogBox>
			{commonActions ? (
				<>
					{editInvoicesVisiblity ? (
						<div style={{ width: '100%' }}>
							<Text onClick={handleClickInvoice}>Edit Invoices</Text>
							<Line />
						</div>
					) : null}

					<div>
						<Text onClick={handleClickCurrency}>Change Currency</Text>
						<Line />
					</div>

					<Text onClick={handleClickRemarks}>Add Remarks</Text>

					<div>
						<Line />
						<Text onClick={handleChangePayment}>Change Payment Mode</Text>
					</div>
				</>
			) : null}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div>
					{commonActions ? <Line /> : null}

					<Text onClick={() => window.open(url, '_blank')}>
						Exchange Rate Document
					</Text>
				</div>
			))}
		</DialogBox>
	);

	return (
		<Container>
			<MainContainer>
				<ActionsWrap>
					<Statuses>
						{['pending', 'approved'].includes(invoice.status) ? (
							<InfoContainer className={invoice.status || ''}>
								{startCase(invoice.status)}
							</InfoContainer>
						) : null}

						{!['reviewed', 'approved', 'revoked'].includes(invoice.status) ? (
							<Button
								className="primary sm"
								onClick={() => setShowReview(true)}
								disabled={disableMarkAsReviewed}
							>
								Mark as Reviewed
							</Button>
						) : null}
					</Statuses>

					{(invoice?.status === 'reviewed'
						&& (!bfInvoice?.systemGeneratedProforma
							|| !bfInvoice?.proformaPdfUrl))
					|| (invoice?.status === 'approved'
						&& !bfInvoice?.systemGeneratedInvoice) ? (
							<Pill>Under Translation</Pill>
						) : null}

					{invoice?.status === 'reviewed'
						&& bfInvoice?.systemGeneratedProforma
						&& bfInvoice?.proformaPdfUrl && (
							<ReviewInvoice>
								<Button
									className="primary sm"
									onClick={updateInvoiceStatus}
									disabled={loading}
								>
									Approve
								</Button>
								<Button
									className="secondary sm"
									onClick={() => setRejectInvoice(true)}
								>
									Reject
								</Button>
							</ReviewInvoice>
					)}

					{invoice?.status === 'amendment_requested' ? (
						<ToolTip
							placement="bottom"
							theme="light-border"
							interactive
							content={<AmendmentReasons invoice={invoice} />}
						>
							<IconInfoWrapper>
								<IcCError width={17} height={17} />
							</IconInfoWrapper>
						</ToolTip>
					) : null}
				</ActionsWrap>

				<ActionsWrap className="icons">
					{/* <EmailWrapper>
						<IcMEmail
							style={{ cursor: 'pointer' }}
							onClick={() => setSendEmail(true)}
						/>

						<ToolTip
							interactive
							placement="bottom"
							content={
								<div style={{ fontSize: '10px', color: '#333333' }}>
									<FlexRow>
										Proforma email sent : {invoice.proforma_email_count || 0}
									</FlexRow>

									<FlexRow className="margin">
										Live email sent: {invoice.sales_email_count || 0}
									</FlexRow>
									{isLTLPrepaid && (
										<FlexRow className="utr_details">
											<FlexRow className="margin">
												UTR Number: {invoice?.sales_utr?.utr_number || ''}
											</FlexRow>
											<FlexRow className="margin">
												Status: {invoice?.sales_utr?.status || ''}
											</FlexRow>
										</FlexRow>
									)}
								</div>
							}
							theme="light"
						>
							<div style={{ margin: '4px 0 0 10px', cursor: 'pointer' }}>
								<IcMInfo />
							</div>
						</ToolTip>
					</EmailWrapper> */}

					{!disableAction || invoice.exchange_rate_document?.length > 0 ? (
						<Popover
							interactive
							placement="left"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<IconMoreWrapper onClick={() => setShow(!show)}>
								<IcMOverflowDot />
							</IconMoreWrapper>
						</Popover>
					) : (
						<div style={{ width: '34px' }} />
					)}

					{!isEmpty(invoice.remarks) ? (
						<ToolTip
							placement="bottom"
							theme="light-border"
							interactive
							content={remarkRender()}
						>
							<IconMoreWrapper>
								<IcMInfo fill="yellow" />
							</IconMoreWrapper>
						</ToolTip>
					) : null}
				</ActionsWrap>
			</MainContainer>

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

			{/* {sendEmail ? (
				<SendInvoiceEmail
					show={sendEmail}
					setShow={setSendEmail}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null} */}

			{showChangePaymentMode ? (
				<ChangePaymentMode
					show={showChangePaymentMode}
					setShow={setShowChangePaymentMode}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{rejectInvoice ? (
				<RejectRequest
					rejectInvoice={rejectInvoice}
					setRejectInvoice={setRejectInvoice}
					invoice={invoice}
					bfInvoice={bfInvoice}
					refetch={handleRefetch}
				/>
			) : null}
		</Container>
	);
}

export default Actions;
