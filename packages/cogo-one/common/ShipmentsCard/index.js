import { Pill, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import { ICONS_MAPPING } from '../../constants/shipmentConstants';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentsCard({
	setShowPocDetails = () => {},
	shipmentItem = {},
	type = '',
	setShowBookingNote = () => {},
	setShowPopover = () => {},
	showPopover = '',
	setShowPocModal = () => {},
	viewType = '',
	handleShipmentChat = () => {},
	setActiveTab = () => {},
	showModalType = () => {},
}) {
	const {
		shipment_type = '',
		net_total = 0,
		net_total_price_currency = '',
		payment_term : paymentTerm = '',
		task_status = '',
		documents = [],
		id: shipmentId = '',
		last_completed_task = {},
		agent: sales_agent = {},
	} = shipmentItem;

	const ShipmentIcon = ICONS_MAPPING[shipment_type] || null;

	return (
		<>
			<div className={styles.main_block}>
				<HeaderBlock
					shipmentItem={shipmentItem}
					setShowPocDetails={setShowPocDetails}
					type={type}
					setShowBookingNote={setShowBookingNote}
					handleShipmentChat={handleShipmentChat}
					setShowPopover={setShowPopover}
					showPopover={showPopover}
					setShowPocModal={setShowPocModal}
					viewType={viewType}
					setActiveTab={setActiveTab}
					showModalType={showModalType}
				/>

				<ShippingRoute
					shipmentItem={shipmentItem}
				/>

				<CargoDetails
					detail={shipmentItem}
					service={shipment_type}
				/>

				<div className={styles.price_details}>
					{paymentTerm ? (
						<Pill size="md" color="#DDEBC0">
							{paymentTerm}
						</Pill>
					) : null}

					<div className={styles.amount}>
						{formatAmount({
							amount   : net_total,
							currency : net_total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
								minimumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			</div>

			<div className={styles.footer_block}>
				{last_completed_task?.task ? (
					<div className={styles.footer_right_block}>
						<div className={styles.current_task_color}>
							Prev Task
						</div>
						<div className={styles.overflow_div}>
							{startCase(last_completed_task?.task)}
						</div>
					</div>
				) : null}
				{task_status === 'approve_booking_note' ? (
					<div className={styles.footer_left_block}>
						<Button
							size="md"
							themeType="primary"
							className={styles.custom_pill_styles}
							onClick={(e) => {
								e.stopPropagation();
								setShowBookingNote({ show: true, data: { documents, shipmentId } });
							}}
						>
							Send Booking Note
						</Button>
					</div>
				) : (
					<div className={styles.footer_right_block}>
						<div className={styles.current_task_color}>
							Current Task
						</div>
						<div className={styles.overflow_div}>
							{startCase(task_status)}
						</div>
					</div>
				)}
			</div>

			<div className={styles.shipment_type_container}>
				{ShipmentIcon && <ShipmentIcon className={styles.ship_icon} /> }
				{startCase(shipment_type)}
				{GLOBAL_CONSTANTS.cogoport_care_user_id === sales_agent?.id && (
					<div className={styles.shipment_tag}>
						Self Served
					</div>
				)}
			</div>
		</>
	);
}

export default ShipmentsCard;
