import { ShipmentDetailContext } from '@cogoport/context';
import { IcMError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import styles from './styles.module.css';

export default function CancelDetails() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.container}>
			<IcMError className={styles.error_icon} />

			<div>
				<h2>This shipment has been cancelled.</h2>

				<h3>
					Reason:&nbsp;
					{startCase(shipment_data?.cancellation_reason || '')}
				</h3>

				<p>
					Remarks:&nbsp;
					{shipment_data?.cancellation_subreason || ''}
				</p>
			</div>
		</div>
	);
}
