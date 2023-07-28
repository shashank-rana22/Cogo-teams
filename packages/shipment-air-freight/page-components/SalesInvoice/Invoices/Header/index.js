import formatAmount from '@cogoport/globalization/utils/formatAmount';

import EditInvoicePreference from './EditInvoicePreference';
import styles from './styles.module.css';

function Header({
	invoiceData = {},
	bfInvoiceRefetch = () => {},
	disableAction = false,
	isCustomer = false,
	salesInvoicesRefetch = () => {},
}) {
	const {
		net_total_price_discounted,
		net_total_price_currency,
		invoicing_parties,
		reviewed_invoices,
	} = invoiceData;

	const refetch = () => {
		bfInvoiceRefetch();
		salesInvoicesRefetch();
	};

	return (
		<div className={styles.container}>
			<div className={styles.flex_row}>
				<div className={styles.total_shipment_title}>Total Shipment Value -</div>

				<div className={styles.shipment_value}>
					{formatAmount({
						amount   : net_total_price_discounted,
						currency : net_total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div className={styles.edit_invoice}>
				{!isCustomer && (
					<div className={styles.reviwed_stats}>
						{`${reviewed_invoices} of ${invoicing_parties?.length} reviewed`}
					</div>
				)}

				<div className={styles.button_div}>
					<EditInvoicePreference
						invoicing_parties={invoicing_parties}
						disableAction={disableAction}
						refetch={refetch}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
