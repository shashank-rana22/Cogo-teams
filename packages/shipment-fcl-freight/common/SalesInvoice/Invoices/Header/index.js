import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import { useContext } from 'react';

import EditInvoicePreference from './EditInvoicePreference';
import ExchangeRate from './ExchangeRate';
import styles from './styles.module.css';

const INDONESIA_CHINA_COUNTRY_ID = [GLOBAL_CONSTANTS.country_ids.ID, GLOBAL_CONSTANTS.country_ids.CN];

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

	const { partner } = useSelector(({ profile }) => ({
		partner: profile?.partner,
	}));

	const { shipment_data } = useContext(ShipmentDetailContext) || {};

	const isAllowedEntity = INDONESIA_CHINA_COUNTRY_ID.includes(partner?.country_id);

	const showExchangeRate = !!shipment_data?.end_to_end_shipment?.is_possible && isAllowedEntity;

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
				{!isCustomer ? (
					<div className={styles.reviwed_stats}>
						{reviewed_invoices}
						{' '}
						of
						{' '}
						{invoicing_parties?.length}
						{' '}
						reviewed
					</div>
				) : null}

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
