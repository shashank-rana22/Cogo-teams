import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

import OrgShipments from './OrgShipments';
import ShipmentInvoices from './ShipmentInvoices';
import styles from './styles.module.css';

function AdditionalShipmentInfo({ item = {}, activeTab = 'export' }) {
	let orgDetails = item?.importer_exporter;

	if (activeTab === 'export' && item?.trade_type === 'import') { orgDetails = item?.consignee_shipper; }

	if (activeTab === 'import' && item?.trade_type === 'export') { orgDetails = item?.importer_exporter; }

	const [toggleVal, setToggleVal] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.customer}>
					{' '}
					Customer :
					{' '}
					{orgDetails?.business_name}
					{' '}
				</div>

				<div>
					Total Customer Outstanding of shipment :
				</div>
				<div> Total Outstanding of customer: </div>
			</div>

			<Toggle
				size="md"
				onLabel="All Shipments"
				offLabel="Invoices Related To Shipments"
				onChange={() => setToggleVal(!toggleVal)}
			/>

			{
                toggleVal ? <ShipmentInvoices /> : <OrgShipments />
            }

		</div>
	);
}

export default AdditionalShipmentInfo;
