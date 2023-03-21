import { Button, Tooltip, Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useContext, useState } from 'react';

import CargoDetails from '../../../../common/CargoDetails';

import AddPoNumber from './AddPoNumber';
import CancelShipment from './CancelShipment';
import Loader from './Loader';
import PortDetails from './PortDetails';
import RequestCancellation from './RequestCancellation';
import styles from './styles.module.css';

function ShipmentHeader() {
	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false);
	const { shipment_data, primary_service, isGettingShipment, refetch } = useContext(ShipmentDetailContext);

	const { po_number, importer_exporter } = shipment_data || {};

	const renderContent = () => {
		// if (isIE && !isRequested) {
		if (false) {
			return (
				<RequestCancellation
					showCancel={showCancel}
					setShowCancel={setShowCancel}
					onClose={() => setShow(false)}
					refetch={refetch}
				/>
			);
		}

		return (
			<CancelShipment
				id={shipment_data?.id}
				showCancel={showCancel}
				setShowCancel={setShowCancel}
				onClose={() => setShow(false)}
				setShow={setShow}
				// isIE={isIE}
				// showRequest={showRequest}
			/>
		);
	};

	const handlePoNo = () => {
		if (po_number) {
			return (
				<div className={styles.po_number}>
					PO Number :
					{' '}
					{po_number}
				</div>
			);
		}

		if (
			!po_number
		) {
			return (
				<Button onClick={() => setShow(true)}>
					Add Po Number
				</Button>
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
					content={(
						<div className={styles.tooltip}>
							{importer_exporter?.business_name}
						</div>
					)}
				>
					<div className={styles.business_name}>{importer_exporter?.business_name}</div>
				</Tooltip>
				<div>
					{handlePoNo()}
				</div>
			</div>
			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>
			<CargoDetails
				primary_service={primary_service}
			/>

			<Popover
				interactive
				placement="bottom"
				theme="light"
				trigger="click"
				content={renderContent()}
			>
				<div className={styles.dots}>
					<IcMOverflowDot />
				</div>
			</Popover>

			{/* <Cancellation /> */}
			{show ? (
				<AddPoNumber show={show} setShow={setShow} shipment_data={shipment_data} refetch={refetch} />
			) : null}

		</div>

	);
}

export default ShipmentHeader;
