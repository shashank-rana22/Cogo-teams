import { cl, Button, Modal, RadioGroup } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMError } from '@cogoport/icons-react';
import { useShipmentBack } from '@cogoport/ocean-modules';
import React, { useState, useContext } from 'react';

import useCreateRolloverShipment from './hooks/useCreateRolloverShipment';
import styles from './styles.module.css';

const KAM_STAKEHOLDERS = ['consignee_shipper_booking_agent', 'booking_agent'];

function Rollover({ rollover_containers }) {
	const [rollover, setRollover] = useState(null);
	const { activeStaekholder } = useContext(ShipmentDetailContext);

	const { loading, handleSubmit } = useCreateRolloverShipment({
		rollover,
		rollover_containers,
	});

	const { handleShipmentsClick } = useShipmentBack();

	if (!KAM_STAKEHOLDERS.includes(activeStaekholder)) {
		return (
			<Modal
				show
				size="sm"
				placement="center"
				closeOnOuterClick={false}
				className={styles.reddish}
			>
				<div className={styles.rollover_info}>
					<IcMError fill="#CB6464" width={30} height={30} />

					<div className={cl`${styles.info} ${styles.mb_12}`}>
						This shipment has been requested for rollover, KAM must confirm
						shipment rollover, before proceeding further.
					</div>
				</div>

				<a
					href="##"
					onClick={() => (!loading ? handleShipmentsClick() : null)}
					className={`link ${loading ? 'disable' : ''}`}
				>
					Back to shipments
				</a>
			</Modal>
		);
	}

	return (
		<Modal
			show
			size="sm"
			placement="center"
			closeOnOuterClick={false}
		>
			<div className={styles.form}>
				<div className="title mb-16">Rollover Shipment</div>

				<div className="label mb-12">Container Numbers</div>

				<div className="container-nums">
					{(rollover_containers || []).map((containerDetails) => (
						<div key={containerDetails?.container_number} className="container-num">
							{containerDetails?.container_number}
						</div>
					))}
				</div>

				<div className="label mb-12">
					A new shipment will be created for above containers, please confirm if
					you want to rollover this shipment?
				</div>

				<RadioGroup
					value={rollover}
					onChange={setRollover}
					className="primary lg"
					options={[
						{ label: 'Yes', value: true },
						{ label: 'No', value: false },
					]}
				/>
			</div>
			<div className={styles.button_container}>
				<a
					href="##"
					onClick={() => (!loading ? handleShipmentsClick() : null)}
					className={`link ${loading ? 'disable' : ''}`}
				>
					Back to shipments
				</a>

				<Button
					disabled={loading || typeof rollover !== 'boolean'}
					className="primary md"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</div>
		</Modal>
	);
}
export default Rollover;
