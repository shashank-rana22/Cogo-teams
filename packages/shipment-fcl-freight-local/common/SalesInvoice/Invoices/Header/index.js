import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import { useContext } from 'react';

import EditInvoicePreference from './EditInvoicePreference';
import ExchangeRate from './ExchangeRate';
import styles from './styles.module.css';

function Header({
	invoiceData = {},
	bfInvoiceRefetch = () => {},
	disableAction = false,
	salesInvoicesRefetch = () => {},
}) {
	const {
		net_total_price_discounted,
		net_total_price_currency,
		invoicing_parties,
		reviewed_invoices,
	} = invoiceData;
	const user_data = useSelector(({ profile }) => profile || {});
	const { shipment_data } = useContext(ShipmentDetailContext) || {};

	const showExchangeRate = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

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
				<div className={styles.reviwed_stats}>
					{reviewed_invoices}
					&nbsp;
					of
					&nbsp;
					{invoicing_parties?.length}
					&nbsp;
					reviewed
				</div>

				<div className={styles.button_div}>
					{showExchangeRate ? (
						<ExchangeRate
							shipment_id={shipment_data.id}
							refetch={refetch}
							invoiceData={invoiceData}
							disableAction={disableAction}
						/>
					) : null}

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
