import { cl, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState, useContext, useRef } from 'react';

import ClickableDiv from '../../../../../ClickableDiv';

import CNNullify from './CNNullify';
import InvoiceInfo from './InvoiceInfo';
import OTPVerification from './OTPVerification';
import ReviewServices from './ReviewServices';
import styles from './styles.module.css';

const RESTRICT_REVOKED_STATUS = ['revoked', 'finance_rejected'];
const MIN_SERIAL_ID_LENGTH = 8;

const BF_INVOICE_STATUS = ['POSTED', 'FAILED', 'IRN_GENERATED'];
const RESTRICTED_ENTITY_IDS = [];

Object.entries(ENTITY_MAPPING).forEach(([, value]) => (
	value?.feature_supported?.includes('freight_sales_invoice_restricted_enitity')
		? RESTRICTED_ENTITY_IDS.push(value.id) : null));

function Header({
	children = null,
	invoice = {},
	bfInvoiceRefetch = () => {},
	invoiceData = {},
	invoicesList = [],
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	refetchCN = () => {},
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorized = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	const { shipment_data } = useContext(ShipmentDetailContext);
	const showForOldShipments = shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
		&& invoice.status === 'pending';

	const [open, setOpen] = useState(false);
	const [askNullify, setAskNullify] = useState(false);
	const [showReview, setShowReview] = useState(false);
	const [showOtpModal, setShowOTPModal] = useState(false);

	const invoicePartyDetailsRef = useRef(null);

	const {
		live_invoice_number,
		billing_address,
	} = invoice;

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const showCN = BF_INVOICE_STATUS.includes(
		bfInvoice?.status,
	);

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === live_invoice_number
			|| item?.proformaNumber === live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.status;

	if (invoiceStatus === 'POSTED') { invoiceStatus = 'IRN GENERATED';	}

	const showRequestCN = showCN && !invoice.is_revoked && !RESTRICT_REVOKED_STATUS.includes(invoice.status)
	&& (shipment_data?.serial_id > GLOBAL_CONSTANTS.invoice_check_id || isAuthorized);

	const invoice_serial_id = invoice?.serial_id?.toString() || '';
	const firstChar = invoice_serial_id[GLOBAL_CONSTANTS.zeroth_index];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < MIN_SERIAL_ID_LENGTH;

	const disableActionCondition = ['reviewed', 'approved'].includes(invoice.status)
	|| isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments
		? isIRNGenerated
		: disableActionCondition;

	if (invoice.status === 'amendment_requested') {
		disableAction = false;
	}

	let disableMarkAsReviewed = disableAction;
	if (showForOldShipments) {
		disableMarkAsReviewed = isIRNGenerated && isInvoiceBefore20Aug2022;
	}

	const isEmptyInvoicesList = isEmpty(invoicesList);
	const isShipmentCompleted = shipment_data.state === 'completed';
	const {
		invoicing_parties: {
			[GLOBAL_CONSTANTS.zeroth_index]: {
				billing_address: { tax_mechanism },
			},
		},
	} = invoiceData;

	const isTaxMechanismGoodsTransportAgency = tax_mechanism === 'goods_transport_agency';

	const deliveryDatePresent = shipment_data.all_services?.[GLOBAL_CONSTANTS.zeroth_index]?.delivery_date;

	disableMarkAsReviewed = !isEmptyInvoicesList && !isShipmentCompleted
		&& !(deliveryDatePresent || isTaxMechanismGoodsTransportAgency);

	return (
		<div className={styles.container}>
			<div>
				{invoice?.source === 'pass_through' ? (
					<div className={styles.invoice_source}>
						Source -
						{' '}
						{startCase(invoice?.source)}
					</div>
				) : null}
				{invoice?.exchange_rate_state ? (
					<div className={styles.invoice_source}>
						Applicable State -
						{' '}
						{startCase(invoice?.exchange_rate_state)}
					</div>
				) : null}
			</div>

			<div className={cl`${styles.flex_row} ${open ? styles.open : ''}`}>

				<div className={styles.invoice_party_details} ref={invoicePartyDetailsRef}>
					<div className={styles.invoice_party_name}>
						{billing_address?.name || billing_address?.business_name}
					</div>

					{!RESTRICTED_ENTITY_IDS.includes(shipment_data?.entity_id) ? (
						<div className={styles.gst}>
							<div className={styles.label}>GST Number :</div>
							<Tooltip
								theme="light"
								placement="bottom"
								content={(
									<div className={styles.tooltip_div}>
										{billing_address?.address}
									</div>
								)}
							>
								<div
									className={styles.gst_number}
								>
									{billing_address?.tax_number}
								</div>
							</Tooltip>
						</div>
					) : null}
				</div>

				<InvoiceInfo
					invoice={invoice}
					bfInvoiceRefetch={bfInvoiceRefetch}
					showRequestCN={showRequestCN}
					disableMarkAsReviewed={disableMarkAsReviewed}
					bfInvoice={bfInvoice}
					invoiceStatus={invoiceStatus}
					setShowReview={setShowReview}
					isAuthorized={isAuthorized}
					disableAction={disableAction}
					setShowOTPModal={setShowOTPModal}
					setAskNullify={setAskNullify}
					salesInvoicesRefetch={salesInvoicesRefetch}
					invoiceData={invoiceData}
				/>

				<ClickableDiv
					className={styles.icon_wrapper}
					onClick={() => setOpen(!open)}
					style={{ height: `${invoicePartyDetailsRef.current?.offsetHeight}px` }}
				>
					{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</ClickableDiv>

			</div>
			{open ? <div>{children}</div> : null}

			{showOtpModal ? (
				<OTPVerification
					showOtpModal={showOtpModal}
					setShowOTPModal={setShowOTPModal}
					invoice={invoice}
					refetch={salesInvoicesRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showReview ? (
				<ReviewServices
					showReview={showReview}
					setShowReview={setShowReview}
					invoice={invoice}
					refetch={salesInvoicesRefetch}
				/>
			) : null}

			<CNNullify
				askNullify={askNullify}
				setAskNullify={setAskNullify}
				invoice={invoice}
				refetchCN={refetchCN}
				invoiceData={invoiceData}
				bfInvoiceRefetch={bfInvoiceRefetch}
			/>
		</div>
	);
}
export default Header;
