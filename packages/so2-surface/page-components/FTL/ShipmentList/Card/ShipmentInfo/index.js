import { Tooltip, cl, Button } from '@cogoport/components';
import { useContext } from 'react';

import DashboardContext from '../../../../../context/DashboardContext';

import styles from './styles.module.css';

export default function ShipmentInfo({ item = {}, clickCard = () => {} }) {
	const { serial_id, booking_party_details, kam_detail } = item;
	const { activeTab } = useContext(DashboardContext);

	return (
		<div className={styles.container}>
			<div
				className={cl`${styles.heading} ${styles.shipment_id}`}
			>
				Shipment ID #
				{serial_id}
				<Button
					size="md"
					themeType="link"
					onClick={clickCard}
					style={{ color: '#408DFF' }}
				>
					View

				</Button>
			</div>
			{['purchase_invoice', 'proforma_invoice'].includes(activeTab)
				? (
					<>
						<Tooltip
							placement="bottom"
							interactive
							content={<div>{booking_party_details?.company_name}</div>}
						>
							<div className={styles.business_name}>{booking_party_details?.company_name}</div>
						</Tooltip>
						{kam_detail?.name ? (
							<div className={styles.heading}>
								KAM:
								<div className={cl`${styles.ellipsis_text} ${styles.kam}`}>{kam_detail?.name}</div>
							</div>
						) : null}
					</>

				) : null}
		</div>
	);
}
