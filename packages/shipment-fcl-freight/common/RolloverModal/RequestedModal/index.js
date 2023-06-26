import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import { useShipmentBack } from '@cogoport/ocean-modules';

import styles from './styles.module.css';

export default function RolloverRequestedModal() {
	const { handleShipmentsClick } = useShipmentBack();

	return (
		<Modal
			show
			size="md"
			placement="center"
			showCloseIcon={false}
			className={styles.reddish}
		>
			<Modal.Header title="Rollover Shipment" />

			<Modal.Body className={styles.rollover_info}>
				<IcCError width={30} height={30} />

				<p>
					This shipment has been requested for rollover, KAM must confirm
					shipment rollover, before proceeding further.
				</p>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="link"
					onClick={handleShipmentsClick}
					className={styles.link}
				>
					Back to shipments
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
