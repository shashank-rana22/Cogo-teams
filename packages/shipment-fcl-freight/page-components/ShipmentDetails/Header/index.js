import { Button, Tooltip } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useContext, useState } from 'react';

// import CargoDetails from '@cogoport/bookings/ShipmentDetails/commons/CargoDetails';
// import { ShipmentDetailContext } from '../../../commons/Context';
// import PortDetails from './PortDetails';
// import Loader from './Loader';
// import PocAndSop from '../../../PocSop';
// import AddPoNumber from './AddPoNumber';
// import Cancellation from '../Cancellation';
import styles from './styles.module.css';

const excludeShipment = ['air_freight'];

function Header() {
	const isMobile = useSelector(({ general }) => general?.isMobile);
	const [open, setOpen] = useState(false);

	// const [{ shipment_data, primary_service, isGettingShipment, refetch }] =
	// 	useContext(ShipmentDetailContext);

	const isGettingShipment = false;

	const shipment_data = {
		serial_id         : '123456',
		po_number         : '9898989',
		stakeholder_types : ['booking_agent'],
	};

	const { serial_id, po_number, stakeholder_types, importer_exporter } =		shipment_data || {};

	const showFeature = stakeholder_types?.some((e) => ['superadmin', 'booking_agent', 'sales_agent', 'user'].includes(e));

	let type = 'Shipment';
	if (shipment_data?.source === 'consol') {
		type = 'Consol';
	} else if (shipment_data?.source === 'coload') {
		type = 'Coload';
	}

	const handlePoNo = () => {
		if (po_number) {
			return (
				<div className={styles.po_number}>
					PO Number
					<span style={{ fontWeight: '700', marginLeft: '4px' }}>
						{po_number}
					</span>
				</div>
			);
		}

		if (
			!po_number
			&& showFeature
			&& !excludeShipment.includes(shipment_data?.shipment_type)
		) {
			return (
				<Button className="secondary sm" onClick={() => setOpen(true)}>
					Add Po Number
				</Button>
			);
		}

		return null;
	};

	// if (isGettingShipment) {
	// 	return <Loader />;
	// }

	return (
		<div className={styles.container}>
			{/* {isMobile ? <PortDetails primary_service={primary_service} /> : null} */}
			<div className={styles.container_info}>
				<div className={styles.row}>
					{showFeature ? (
						<Tooltip
							theme="light"
							placement="right"
							content={(
								<div style={{ fontSize: '10px' }}>
									{/* {importer_exporter?.business_name} */}
								</div>
							)}
						>
							<div className={styles.customer}>{importer_exporter?.business_name || 'aaaa'}</div>
						</Tooltip>
					) : (
						<div className={styles.serial_id}>
							{type}
							{' '}
							ID
							<span style={{ fontWeight: 700, marginLeft: '4px' }}>
								#
								{serial_id}
							</span>
						</div>
					)}

					{handlePoNo()}
				</div>

				{/* {!isMobile && (
					<PortDetails data={shipment_data} primary_service={primary_service} />
				)} */}

				{isMobile && <div style={{ border: '1px solid #E0E0E0' }} />}

				{/* <div className={styles.service_detail}>
					<CargoDetails
						primary_service={primary_service}
						shipment_data={shipment_data}
					/>

					<Cancellation />
				</div> */}
			</div>
			{/* <PocAndSop /> */}

			{/* {open ? (
				<StyledModal
					className="primary md"
					show={open}
					onClose={() => setOpen(false)}
					styles={{ dialog: { width: isMobile ? 360 : 700 } }}
				>
					<AddPoNumber
						setOpen={setOpen}
						shipment_data={shipment_data}
						refetch={refetch}
					/>
				</StyledModal>
			) : null} */}
		</div>
	);
}

export default Header;
