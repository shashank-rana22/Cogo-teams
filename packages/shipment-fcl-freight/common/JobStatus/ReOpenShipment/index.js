import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import React, { useContext } from 'react';

import useUpdateShipmentReopenJob from '../../../hooks/useUpdateShipmentReopenJob';

import styles from './styles.module.css';

function ReOpenShipment({
	shipment_id = '',
	finJobOpenConfirmation = false,
	setFinJobOpenConfirmation = () => {},
}) {
	const profile = useSelector((state) => state.profile || {});
	const { refetch = () => {} } = useContext(ShipmentDetailContext);
	const { id = '' } = profile?.user || {};

	const closeAndRefetch = () => {
		setFinJobOpenConfirmation(false);
		refetch();
	};

	const {
		loading = false,
		handleConfirm = () => {},
	} = useUpdateShipmentReopenJob({ closeAndRefetch, shipment_id });

	return (
		<div>
			{[GLOBAL_CONSTANTS.uuid.hk_user_id, GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id].includes(id) && (
				<Button
					themeType="secondary"
					size="md"
					className={styles.request_reopen}
					onClick={() => setFinJobOpenConfirmation(true)}
				>
					Fin Re-open
				</Button>
			)}

			{finJobOpenConfirmation
				? (
					<Modal
						size="sm"
						show={finJobOpenConfirmation}
						onClose={() => setFinJobOpenConfirmation(false)}
						closeOnOuterClick
					>
						<Modal.Header title="Request Re-open" />

						<Modal.Body>
							<div className={styles.details}>
								Are you sure you want to Re-open the Shipment?
							</div>
						</Modal.Body>

						<Modal.Footer className={styles.modal_footer}>
							<Button
								themeType="secondary"
								size="md"
								onClick={() => setFinJobOpenConfirmation(false)}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button
								themeType="primary"
								size="md"
								disabled={loading}
								onClick={handleConfirm}
							>
								Submit
							</Button>
						</Modal.Footer>
					</Modal>
				) : null}
		</div>

	);
}

export default ReOpenShipment;
