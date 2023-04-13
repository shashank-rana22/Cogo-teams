import { Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext, useState } from 'react';

import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import styles from './styles.module.css';

function ShipmentHeader() {
	const [show, setShow] = useState(false);
	const {
		shipment_data,
		primary_service,
		isGettingShipment,
		refetch,
		activeStakeholder = '',
	} = useContext(ShipmentDetailContext);

	const { po_number, importer_exporter = {}, consignee_shipper = {} } = shipment_data || {};

	const handlePoNo = () => {
		if (po_number) {
			return (
				<div className={styles.po_number}>
					PO Number:&nbsp;
					{po_number}
				</div>
			);
		}

		if (
			!po_number
		) {
			return (
				<div
					className={styles.button}
					role="button"
					tabIndex={0}
					onClick={() => setShow(true)}
				>
					Add Po Number
				</div>
			);
		}

		return null;
	};

	if (isGettingShipment) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.customer}>
				<Tooltip
					theme="light"
					placement="bottom"
					maxWidth="none"
					interactive
					content={(
						<div className={styles.tooltip}>
							{activeStakeholder !== 'consignee_shipper_booking_agent'
								? importer_exporter?.business_name
								: consignee_shipper?.business_name}
						</div>
					)}
				>
					<div className={styles.business_name}>

						{activeStakeholder !== 'consignee_shipper_booking_agent'
							? importer_exporter?.business_name
							: consignee_shipper?.business_name}
					</div>
				</Tooltip>
				<div className={styles.po_number}>
					{handlePoNo()}
				</div>
			</div>
			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>
			<CargoDetails
				primary_service={primary_service}
			/>

			{show ? (
				<AddPoNumber show={show} setShow={setShow} shipment_data={shipment_data} refetch={refetch} />
			) : null}
		</div>
	);
}

export default ShipmentHeader;
