import { Button, Modal, RadioGroup, Pill } from '@cogoport/components';
import { useShipmentBack } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateRolloverShipment from '../hooks/useCreateRolloverShipment';

import styles from './styles.module.css';

export default function RolloverActionModal({ rollover_containers = [] }) {
	const [isRollover, setIsRollover] = useState(null);

	const { loading, handleSubmit } = useCreateRolloverShipment({
		isRollover: isRollover === 'true',
		rollover_containers,
	});

	const { handleShipmentsClick } = useShipmentBack();

	return (
		<Modal
			show
			size="md"
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header title="Rollover Shipment" />

			<Modal.Body className={styles.form}>
				<b>Container Numbers</b>

				<p>
					{(rollover_containers || []).map((containerDetails) => (
						<Pill key={containerDetails?.container_number} size="md" color="#f2f2f2">
							{containerDetails?.container_number}
						</Pill>
					))}
				</p>

				<p>
					A new shipment will be created for above containers if you choose to rollover, please confirm if
					you want to rollover this shipment?
				</p>

				<RadioGroup
					value={isRollover}
					onChange={setIsRollover}
					options={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
				/>
			</Modal.Body>

			<Modal.Footer className={styles.button_container}>
				<Button
					themeType="link"
					onClick={handleShipmentsClick}
					disabled={loading}
					className={styles.link}
				>
					Back to shipments
				</Button>

				<Button
					disabled={loading || isEmpty(isRollover)}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
