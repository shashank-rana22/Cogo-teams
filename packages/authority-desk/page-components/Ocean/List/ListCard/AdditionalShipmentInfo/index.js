import { Toggle } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React, { useState } from 'react';

import OrgShipments from './OrgShipments';
import ShipmentInvoices from './ShipmentInvoices';
import styles from './styles.module.css';

function AdditionalShipmentInfo({ item = {}, filters = {}, setFilters = () => {} }) {
	const orgDetails = item?.importer_exporter;

	const [toggleVal, setToggleVal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.customer}>
					Customer:&nbsp;
					{orgDetails?.business_name}
				</div>

				<div>
					Total Customer Outstanding of shipment: &nbsp;

					{formatAmount({
						amount   : item?.invoice_status?.invoice_total?.[orgDetails?.id],
						currency : item?.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}

				</div>
				<div>
					Total Outstanding of customer:&nbsp;
					{formatAmount({
						amount: item?.invoice_status
							?.outstanding_amount,
						currency : item?.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<Toggle
				size="md"
				onLabel="All Shipments"
				offLabel="Invoices Related To Shipments"
				onChange={() => setToggleVal(!toggleVal)}
				className={styles.toggle}
			/>

			{
                !toggleVal ? <ShipmentInvoices item={item} /> : (
	<OrgShipments
		item={item}
		filters={filters}
		setFilters={setFilters}
	/>
                )
            }

		</div>
	);
}

export default AdditionalShipmentInfo;
