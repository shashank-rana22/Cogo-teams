import { cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, isEmpty } from '@cogoport/utils';

import { getDocumentInfo } from '../../../../../../helpers/getDocumentInfo';

import styles from './styles.module.css';

const CREDIT_SOURCE_FIRST = 0;

const SLICE_CREDIT_UPTO = -2;

const CREDIT_INDEX_OFFSET = 2;

function InvoiceDetail({
	invoice = {},
	invoicesList = [],
}) {
	const {
		invoice_total_currency,
		invoice_total_discounted = 0,
		live_invoice_number = '',
		credit_option = {},
		payment_mode = '',
	} = invoice;

	const creditSource = credit_option?.credit_source?.split('_');

	const BF_INVOICE_DETAILS = invoicesList?.filter(
		(item) => [item?.proformaNumber, item?.invoiceNumber].includes(live_invoice_number),
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const { status = '', invoiceRejectionReason = '-' } = BF_INVOICE_DETAILS || {};

	const {
		invoice_pdf = '',
	} = getDocumentInfo({ bfInvoice: BF_INVOICE_DETAILS });

	const handleDownload = (invoiceLink) => {
		window.open(invoiceLink);
	};

	return (
		<div className={styles.invoice_info}>
			<div className={styles.so_container}>
				<div
					className={cl`${styles.so_number} ${!isEmpty(BF_INVOICE_DETAILS) ? styles.active : ''}`}
					role="presentation"
					onClick={() => (!isEmpty(BF_INVOICE_DETAILS)
						? handleDownload(invoice_pdf)
						: null)}
				>
					{live_invoice_number}
				</div>

				<div className={styles.status_container}>
					{status === 'FINANCE_REJECTED' ? (
						<Tooltip
							theme="light"
							placement="bottom"
							content={
								<div>{invoiceRejectionReason}</div>
							}
						>
							<div className={styles.status_style}>{startCase(status || '')}</div>
						</Tooltip>
					) : (
						<div>{startCase(status || '')}</div>
					)}
				</div>

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

			{payment_mode ? (
				<div className={styles.payment_mode_status}>
					{payment_mode === 'credit' ? (
						<div>
							<div className={styles.info_container}>
								{startCase(creditSource?.slice(CREDIT_SOURCE_FIRST, SLICE_CREDIT_UPTO) || '')}
							</div>

							<div className={styles.payment_method}>
								{startCase(
									`${
										creditSource?.
											[(creditSource?.length ?? CREDIT_SOURCE_FIRST) - CREDIT_INDEX_OFFSET]
									} deferred payment`,
								)}
							</div>
						</div>
					) : (
						<div className={styles.payment_method}>{payment_mode}</div>
					)}
				</div>
			) : null}

		</div>
	);
}

export default InvoiceDetail;
