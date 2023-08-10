import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import LtlEditParams from './LtlEditParams';
import styles from './styles.module.css';

export default function EditParams({ setShow }) {
	const { servicesList, shipment_data } = useContext(ShipmentDetailContext);
	const closeModal = () => setShow(false);

	const servicesToShow = (servicesList || []).filter(
		(service) => service?.service_type === `${shipment_data?.shipment_type}_service`,
	);

	return (
		<Modal
			show
			onClose={closeModal}
			closeOnOuterClick={false}
			className={styles.my_modal}
			size="lg"
		>
			<Modal.Header title={(
				<>
					<h4>Update Details</h4>
					<p className={styles.sub_heading}>Updating the booking details will impact the quotation(s)</p>
				</>
			)}
			/>

			<Modal.Body>
				<LtlEditParams
					closeModal={closeModal}
					detail={servicesToShow[0]}
				/>
			</Modal.Body>

		</Modal>
	);
}
