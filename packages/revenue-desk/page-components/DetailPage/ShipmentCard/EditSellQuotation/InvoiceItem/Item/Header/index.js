import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Actions from './Actions';
import styles from './styles.module.css';

function Header({
	children = null,
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
}) {
	const [open, setOpen] = useState(false);

	const { invoice_total_currency, invoice_total_discounted, billing_address } = invoice;

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
			<div className={styles.flex_row}>
				<div className={styles.invoce_party_details}>
					<div className={styles.invoice_party_name}>
						{billing_address?.name || billing_address?.business_name}
					</div>
					{shipment_data?.entity_id
						!== GLOBAL_CONSTANTS.country_entity_ids.VN && (
							<div className={styles.gst}>
								<div className={styles.label}>GST Number :</div>
								<Tooltip content={billing_address?.address} placement="left">
									<div className={styles.gst_number}>{billing_address?.tax_number}</div>
								</Tooltip>
							</div>
					)}
				</div>

				<div className={styles.invoice_info}>
					<div className={styles.invoice_value_container}>
						<div className={styles.invoice_value_title}>Invoice Value - </div>
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
					<div className={styles.payment_method}>{invoice?.payment_mode}</div>
				</div>

				<div className={styles.invoice_container}>
					{invoice?.status && invoice?.status === 'revoked' ? (
						<div className={styles.info_container}>
							{startCase(invoice?.status)}
						</div>
					) : null}
					<Actions
						invoice={invoice}
						refetch={refetch}
						shipment_data={shipment_data}
						invoiceData={invoiceData}
					/>
				</div>

				<div className={styles.icon_wrapper} role="presentation" onClick={() => setOpen(!open)}>
					{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</div>
			</div>

			<div className={open ? styles.show : styles.close}>
				<div>{children}</div>
			</div>
		</div>
	);
}
export default Header;
