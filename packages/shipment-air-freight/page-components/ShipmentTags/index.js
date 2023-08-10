import { IcCError } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import DocumentHoldHeader from './DocumentHoldHeader';
import styles from './styles.module.css';

function ShipmentTags({ shipmentData }) {
	const { document_delay_status = '', tags = [], cancellation_reason = '', state = '' } = shipmentData;
	return (
		<>
			{!isEmpty(document_delay_status) && <DocumentHoldHeader />}

			{tags.includes('post_facto') && (
				<div className={styles.post_facto}>This is Post Facto Shipment !</div>
			)}
			{state === 'cancelled' && (
				<div className={styles.cancelled}>

					<div className={styles.heading}>
						<IcCError width={25} height={25} />
						Your Booking Is Cancelled.

					</div>

					{cancellation_reason && (
						<div className={styles.sub_heading}>
							Reason:
							{' '}
							{startCase(cancellation_reason)}
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default ShipmentTags;
