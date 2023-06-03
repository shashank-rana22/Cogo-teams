import { Button, cl, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState, useContext, useRef } from 'react';

import CONSTANTS from '../../../../../../configurations/contants.json';
import useUpdateShipmentInvoiceStatus from '../../../../../../hooks/useUpdateShipmentInvoiceStatus';
import ClickableDiv from '../../../../../ClickableDiv';

import Actions from './Actions';
// import CNNullify from './CNNullify';
import styles from './styles.module.css';

const RESTRICT_REVOKED_STATUS = ['revoked', 'finance_rejected'];

const API_SUCCESS_MESSAGE = {
	reviewed : 'Invoice sent for approval to customer!',
	approved : 'Invoice approved!,',
};

const BF_INVOICE_STATUS = ['POSTED', 'FAILED', 'IRN_GENERATED'];

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
	const [open, setOpen] = useState(false);
	const [askNullify, setAskNullify] = useState(false);

	const { shipment_data } = useContext(ShipmentDetailContext);

	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorized = user_data.email === CONSTANTS.ajeet_email;

	const invoicePartyDetailsRef = useRef(null);

	const {
		invoice_total_currency,
		invoice_total_discounted,
		live_invoice_number,
		billing_address,
	} = invoice;

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === live_invoice_number,
	)?.[0];

	const showCN = BF_INVOICE_STATUS.includes(
		bfInvoice?.status,
	);

	const handleDownload = (invoiceLink) => {
		window.open(invoiceLink);
	};

	const refetchAferApiCall = () => {
		bfInvoiceRefetch();
	};

	const { updateInvoiceStatus = () => {} } = useUpdateShipmentInvoiceStatus({ refetch: refetchAferApiCall });

	const showIrnTriggerForOldShipments = shipment_data?.serial_id <= 120347 && invoice?.status === 'reviewed'
		&& !isEmpty(invoice?.data);

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === live_invoice_number
			|| item?.proformaNumber === live_invoice_number,
	)?.[0]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}

	const handleClick = (type) => {
		updateInvoiceStatus({
			payload: {
				id     : invoice?.id,
				status : type,
			},
			message: API_SUCCESS_MESSAGE[type],
		});
	};

	const creditSource = invoice?.credit_option?.credit_source?.split('_');

	const showRequestCN = showCN && !invoice.is_revoked && !RESTRICT_REVOKED_STATUS.includes(invoice.status)
	&& (shipment_data?.serial_id > 120347 || isAuthorized);

	return (
		<div className={styles.container}>
			<div>

				{invoice?.source === 'pass_through' ? (
					<div className={styles.invoice_source}>
						Source -
						&nbsp;
						{startCase(invoice?.source)}
					</div>
				) : null}

				{invoice?.exchange_rate_state ? (
					<div className={styles.invoice_source}>
						Applicable State -
						&nbsp;
						{startCase(invoice?.exchange_rate_state)}
					</div>
				) : null}
			</div>

			<div className={cl`${styles.flex_row} ${open ? styles.open : ''}`}>
				<div className={styles.invoice_party_details} ref={invoicePartyDetailsRef}>
					<div className={styles.invoice_party_name}>
						{billing_address?.name || billing_address?.business_name}
					</div>

					{shipment_data?.entity_id
						!== GLOBAL_CONSTANTS.country_entity_ids.VN ? (
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

				<div className={styles.invoice_info}>
					<div className={styles.so_container}>
						<ClickableDiv
							className={cl`${styles.so_number} ${!isEmpty(bfInvoice) ? styles.active : ''}`}
							onClick={() => (!isEmpty(bfInvoice)
								? handleDownload(
									bfInvoice?.invoicePdfUrl || bfInvoice?.proformaPdfUrl,
								)
								: null)}
						>
							{bfInvoice?.invoiceNumber
								|| bfInvoice?.proformaNumber
								|| live_invoice_number}
						</ClickableDiv>

						<div className={styles.status_container}>
							{invoiceStatus === 'FINANCE_REJECTED' ? (
								<Tooltip
									theme="light"
									placement="bottom"
									content={
										<div>{bfInvoice?.invoiceRejectionReason || '-'}</div>
									}
								>
									<div className={styles.status_style}>{startCase(invoiceStatus)}</div>
								</Tooltip>
							) : (
								<div>{startCase(invoiceStatus)}</div>
							)}
						</div>

						{showIrnTriggerForOldShipments ? (
							<Button
								onClick={() => handleClick('approved')}
							>
								Generate IRN Invoice
							</Button>
						) : null}
					</div>
					<div className={styles.invoice_value_container}>
						<div className={styles.invoice_value_title}>Invoice Value -</div>

						<div className={styles.invoice_value}>
							{formatAmount({
								amount   : invoice_total_discounted,
								currency : invoice_total_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</div>
					</div>

					<div className={styles.payment_mode_status}>
						{invoice?.payment_mode === 'credit' ? (
							<div>
								<div className={styles.info_container}>
									{startCase(creditSource?.slice(0, -2))}
								</div>

								<div className={styles.payment_method}>
									{startCase(
										`${
											creditSource?.[(creditSource?.length ?? 0) - 2]
										} deferred payment`,
									)}
								</div>
							</div>
						) : (
							<div className={styles.payment_method}>{invoice?.payment_mode}</div>
						)}
					</div>
				</div>

				<div className={styles.invoice_container}>
					{invoice.status
					&& RESTRICT_REVOKED_STATUS.includes(invoice.status) ? (
						<div className={styles.invoice_status}>
							{startCase(invoice.status)}
						</div>
						) : null}

					{!invoice.is_revoked && invoice.status !== 'finance_rejected' ? (
						<Actions
							invoice={invoice}
							bfInvoiceRefetch={bfInvoiceRefetch}
							invoiceData={invoiceData}
							isIRNGenerated={isIRNGenerated}
							salesInvoicesRefetch={salesInvoicesRefetch}
							bfInvoice={bfInvoice}
							isAuthorized={isAuthorized}
						/>
					) : null}

					{invoice?.status === 'reviewed'
					&& shipment_data?.serial_id <= 120347 ? (
						<Button
							style={{ marginTop: '4px' }}
							size="sm"
							onClick={() => handleClick('amendment_requested')}
						>
							Request Amendment
						</Button>
						) : null}

					{showRequestCN ? (
						<Button
							style={{ marginTop: '4px' }}
							size="sm"
							onClick={() => setAskNullify(true)}
						>
							Request CN
						</Button>
					) : null}

					{invoice?.is_revoked && invoice?.status !== 'revoked' ? (
						<div className={styles.info_container}>Requested for Revoke</div>
					) : null}
				</div>

				<ClickableDiv
					className={styles.icon_wrapper}
					onClick={() => setOpen(!open)}
					style={{
						height:
						`${invoicePartyDetailsRef.current?.offsetHeight}px`,
					}}
				>
					{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</ClickableDiv>
			</div>

			{open ? <div>{children}</div> : null}

			{/* <CNNullify
				askNullify={askNullify}
				setAskNullify={setAskNullify}
				invoice={invoice}
				refetchCN={refetchCN}
				invoiceData={invoiceData}
				bfInvoiceRefetch={bfInvoiceRefetch}
			/> */}
		</div>
	);
}
export default Header;
