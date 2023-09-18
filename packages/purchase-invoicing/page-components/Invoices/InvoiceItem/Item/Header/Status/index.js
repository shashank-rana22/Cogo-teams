import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import Actions from './Actions';
import styles from './styles.module.css';

function Status({
	invoice = {},
	refetchAferApiCall = () => {},
}) {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.status_container_outer}>
			<div className={styles.invoice_status}>
				{startCase(invoice?.status || '')}
			</div>

			{!invoice?.is_revoked && invoice?.status !== 'finance_rejected' && (
				<Actions
					invoice={invoice}
					refetch={refetchAferApiCall}
					shipment_data={shipment_data}
				/>
			)}
		</div>
	);
}
export default Status;
