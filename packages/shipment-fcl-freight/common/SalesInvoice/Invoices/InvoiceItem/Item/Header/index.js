import { Button, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
// import { useSelector } from '@cogo/store';
// import { Flex } from '@cogoport/front/components';
// import { ToolTip, Button } from '@cogoport/front/components/admin';
import { startCase, isEmpty } from '@cogoport/utils';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Actions from './Actions';
import CNNullify from './CNNullify';
import styles from './styles.module.css';
// import useUpdateInvoiceStatus from '../../../../../../hooks/useUpdateInvoiceStatus';

const RESTRICT_REVOKED_STATUS = ['revoked', 'finance_rejected'];

function Header({
	children = null,
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	invoicesList = [],
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	refetchCN = () => {},
}) {
	const [open, setOpen] = useState(false);
	const [askNullify, setAskNullify] = useState(false);
	const [status, setStatus] = useState('');

	// const { user_data } = useSelector(({ profile }) => ({
	// 	user_data: profile || {},
	// }));
	const user_data = { email: 'ajeet@cogoport.com' };
	const isAuthorized = user_data.email === 'ajeet@cogoport.com';

	const {
		invoice_total_currency,
		invoice_total_discounted,
		live_invoice_number,
		billing_address,
	} = invoice;

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === live_invoice_number,
	)?.[0];

	const showCN = ['POSTED', 'FAILED', 'IRN_GENERATED'].includes(
		bfInvoice?.status,
	);

	const handleDownload = (invoiceLink) => {
		window.open(invoiceLink);
	};

	// const { updateInvoiceStatus, loading } = useUpdateInvoiceStatus({
	// 	invoice,
	// 	refetch,
	// 	status,
	// });

	// const showIrnTriggerForOldShipments =		shipment_data?.serial_id <= 120347
	// 	&& invoice?.status === 'reviewed'
	// 	&& !isEmpty(invoice?.data);

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === live_invoice_number
			|| item?.proformaNumber === live_invoice_number,
	)?.[0]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}

	const handleClick = (type) => {
		setStatus(type);
		// updateInvoiceStatus();
	};

	const creditSource = invoice?.credit_option?.credit_source?.split('_');

	// const restrictCN =
	// 	['fcl_freight', 'lcl_freight', 'rail_domestic_freight'].includes(
	// 		shipment_data?.shipment_type,
	// 	) && shipment_data?.state === 'cancelled';

	const showRequestCN =		showCN
		&& !invoice.is_revoked
		&& !RESTRICT_REVOKED_STATUS.includes(invoice.status)
		&& (shipment_data?.serial_id > 120347 || isAuthorized);

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
				<div className={styles.invoice_party_details}>
					<div className={styles.invoice_party_name}>
						{billing_address?.name || billing_address?.business_name}
					</div>

					{shipment_data?.entity_id
						!== GLOBAL_CONSTANTS.country_entity_ids.VN && (
							<div className={styles.gst}>
								<div className={styles.label}>GST Number :</div>

								<Tooltip
									theme="light"
									interactive
									content={(
										<div
											style={{ fontSize: '10px', textTransform: 'capitalize' }}
										>
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
					)}
				</div>

				<div className={styles.invoice_info}>
					<div className={styles.so_container}>
						<div
							className={styles.so_number}
							role="button"
							tabIndex={0}
							// className={!isEmpty(bfInvoice) ? 'active' : null}
							onClick={() => (!isEmpty(bfInvoice)
								? handleDownload(
									bfInvoice?.invoicePdfUrl || bfInvoice?.proformaPdfUrl,
								)
								: null)}
						>
							{bfInvoice?.invoiceNumber
								|| bfInvoice?.proformaNumber
								|| live_invoice_number}
						</div>

						<div className={styles.status_container}>
							{invoiceStatus === 'FINANCE_REJECTED' ? (
								<Tooltip
									theme="light"
									placement="top"
									interactive
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

						{/* {showIrnTriggerForOldShipments ? (
							<Button
								onClick={() => handleClick('approved')}
							>
								Generate IRN Invoice
							</Button>
						) : null} */}
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
									{startCase(creditSource?.slice(0, -2) || '')}
								</div>

								<div className={styles.payment_method}>
									{startCase(
										`${
											creditSource?.[creditSource?.length ?? 0 - 2]
										} deferred payment`,
									)}
									payment
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
						<div className={styles.invoice_container}>
							{startCase(invoice.status)}
						</div>
						) : null}

					{!invoice.is_revoked && invoice.status !== 'finance_rejected' ? (
						<Actions
							invoice={invoice}
							refetch={refetch}
							shipment_data={shipment_data}
							invoiceData={invoiceData}
							isIRNGenerated={isIRNGenerated}
							salesInvoicesRefetch={salesInvoicesRefetch}
							invoicesList={invoicesList}
							bfInvoice={bfInvoice}
						/>
					) : null}

					{invoice?.status === 'reviewed'
					&& shipment_data?.serial_id <= 120347 ? (
						<Button
							style={{
								marginTop     : '4px',
								textTransform : 'capitalize',
								letterSpacing : '0px',
							}}
							className="primary sm"
							onClick={() => handleClick('amendment_requested')}
						>
							Request Amendment
						</Button>
						) : null}

					{showRequestCN ? (
						<Button
							style={{
								marginTop     : '4px',
								textTransform : 'capitalize',
								letterSpacing : '0px',
							}}
							className="primary sm"
							onClick={() => setAskNullify(true)}
						>
							Request CN
						</Button>
					) : null}

					{invoice?.is_revoked && invoice?.status !== 'revoked' ? (
						<div className={styles.info_container}>Requested for Revoke</div>
					) : null}
				</div>

				<div className={styles.icon_wrapper} role="button" tabIndex={0} onClick={() => setOpen(!open)}>
					{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</div>
			</div>

			{open ? <div>{children}</div> : null}

			<CNNullify
				askNullify={askNullify}
				setAskNullify={setAskNullify}
				shipment_serial_id={shipment_data?.serial_id}
				invoice={invoice}
				refetchCN={refetchCN}
				invoiceData={invoiceData}
				refetch={refetch}
			/>
		</div>
	);
}
export default Header;
