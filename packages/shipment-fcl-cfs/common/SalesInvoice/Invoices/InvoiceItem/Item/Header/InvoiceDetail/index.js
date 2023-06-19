import { Button, cl, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import CONSTANTS from '../../../../../../../configurations/constant.json';
import styles from '../styles.module.css';

const API_SUCCESS_MESSAGE = {
	reviewed : 'Invoice sent for approval to customer!',
	approved : 'Invoice approved!,',
};

const ZERO_INDEX = 0;
const NEGATIVE_SECOND_INDEX = -2;
const SECOND_INDEX = 2;

function InvoiceDetail({
	invoice = {},
	invoicesList = [],
	updateInvoiceStatus = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const {
		invoice_total_currency,
		invoice_total_discounted,
		live_invoice_number,
	} = invoice;

	const bfInvoice = invoicesList?.filter(
		(item) => item?.proformaNumber === live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const handleDownload = (invoiceLink) => {
		window.open(invoiceLink);
	};

	const showIrnTriggerForOldShipments = shipment_data?.serial_id <= CONSTANTS.invoice_check_id
	&& invoice?.status === 'reviewed'
		&& !isEmpty(invoice?.data);

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === live_invoice_number
			|| item?.proformaNumber === live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.status;

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

	return (
		<div className={styles.invoice_info}>
			<div className={styles.so_container}>
				<div
					className={cl`${styles.so_number} ${!isEmpty(bfInvoice) ? styles.active : ''}`}
					role="button"
					tabIndex={0}
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
							{startCase(creditSource?.slice(ZERO_INDEX, NEGATIVE_SECOND_INDEX))}
						</div>

						<div className={styles.payment_method}>
							{startCase(
								`${
									creditSource?.[(creditSource?.length ?? ZERO_INDEX) - SECOND_INDEX]
								} deferred payment`,
							)}
						</div>
					</div>
				) : (
					<div className={styles.payment_method}>{invoice?.payment_mode}</div>
				)}
			</div>
		</div>
	);
}
export default InvoiceDetail;
