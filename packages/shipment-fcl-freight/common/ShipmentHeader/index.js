import { Popover, Tooltip, Toast, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot, IcMCopy } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useContext, useState } from 'react';

import CancelShipment from '../CancelShipment';
import CargoDetails from '../CargoDetails';
import PortDetails from '../PortDetails';

import AddPoNumber from './AddPoNumber';
import Loader from './Loader';
import styles from './styles.module.css';
import getCanCancelShipment from './utils/getCanCancelShipment';

const STYLE_ICON = {
	height : 25,
	width  : 25,
};

function ShipmentHeader() {
	const user_data = useSelector((({ profile }) => profile?.user));

	const {
		shipment_data, primary_service,
		isGettingShipment,
		activeStakeholder, stakeholderConfig,
	} = useContext(ShipmentDetailContext);

	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const { po_number, importer_exporter = {}, consignee_shipper = {} } = shipment_data || {};

	if (isGettingShipment) {
		return <Loader />;
	}

	const showPoNumber = !!stakeholderConfig?.shipment_header?.show_po_number;
	const showCfsDetails = !!stakeholderConfig?.shipment_header?.show_poc_details;

	const showCancelShipmentIcon = getCanCancelShipment({
		shipment_data,
		primary_service,
		user_data,
		activeStakeholder,
		stakeholderConfig,
	});

	const showPocDetails = !!stakeholderConfig?.shipment_header?.show_poc_details;

	const handleCopy = async (val) => {
		navigator.clipboard
			.writeText(val)
			.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
	};

	const cfsDetails = () => (
		<div className={styles.heading}>
			<span>CFS Address:</span>
			<div className={styles.cfs_details}>
				RSP Tower, Plot No.28-P, Urban Estate, Sector - 44 ,Gurgaon – 122003, Haryana, India
			</div>
			<div
				role="presentation"
				onClick={() => {
					navigator.clipboard.writeText(primary_service?.cfs_service);
				}}
			/>
			<IcMCopy
				onClick={() => handleCopy(primary_service?.cfs_service)}
				style={STYLE_ICON}
			/>
		</div>
	);

	return (
		<div className={cl`${styles.container} ${!showPocDetails ? styles.igm_desk : ''}`}>
			<div className={cl`${styles.customer} ${!showPocDetails ? styles.igm_desk : ''}`}>
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

				{showPoNumber ? (
					<div>
						{po_number ? (
							<div className={styles.po_number}>
								PO Number:
								{' '}
								{po_number}
							</div>
						) : (
							<div
								className={styles.button}
								role="presentation"
								onClick={() => setShowModal('add_po_number')}
							>
								Add PO Number
							</div>
						)}
					</div>
				) : null }
			</div>

			<div className={styles.port_details}>
				<PortDetails data={shipment_data} primary_service={primary_service} />
			</div>

			{showCfsDetails ? <CargoDetails primary_service={primary_service} /> : <div>{cfsDetails()}</div>}

			{showCancelShipmentIcon
				? (
					<Popover
						visible={showPopover}
						render={(
							<div
								role="presentation"
								className={styles.cancel_button}
								onClick={() => { setShowModal('cancel_shipment'); setShowPopover(false); }}
							>
								Cancel Shipment
							</div>
						)}
						onClickOutside={() => setShowPopover(false)}
						placement="bottom"
					>
						<IcMOverflowDot className={styles.three_dot_icon} onClick={() => setShowPopover((p) => !p)} />
					</Popover>
				) : null}

			{showModal === 'add_po_number' ? (
				<AddPoNumber
					setShow={setShowModal}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'cancel_shipment' ? (
				<CancelShipment setShow={setShowModal} />
			) : null}
		</div>
	);
}

export default ShipmentHeader;
