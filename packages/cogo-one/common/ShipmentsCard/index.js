import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import { ICONS_MAPPING } from './iconsMapping';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentsCard({
	setShowPocDetails = () => {},
	shipmentItem = {},
	type = '',
	setShowBookingNote = () => {},
}) {
	const {
		shipment_type = '',
		net_total = 0,
		net_total_price_currency = '',
		payment_term : paymentTerm = '',
		task_status = '',
		documents = [],
		id:shipmentId = '',
		last_completed_task = {},
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
				<div className={styles.footer_right_block}>
					<div className={styles.current_task_color}>
						Current Task:
					</div>
					<div className={styles.overflow_div}>
						{startCase(task_status)}
					</div>
				</div>

				{task_status === 'approve_booking_note' ? (
					<div className={styles.footer_left_block}>
						<div
							className={styles.custom_pill_styles}
							role="presentation"
							onClick={(e) => {
								e.stopPropagation();
								setShowBookingNote({ show: true, data: { documents, shipmentId } });
							}}
						>
							Send BN
						</div>
					</div>
				) : (
					<div className={styles.footer_right_block}>
						{last_completed_task?.task && (
							<div className={styles.current_task_color}>
								Last Task:
							</div>
						)}
						<div className={styles.overflow_div}>
							{startCase(last_completed_task?.task)}
						</div>
					</div>
				)}
			</div>

			<div className={styles.shipment_type_container}>
				{ShipmentIcon && <ShipmentIcon className={styles.ship_icon} /> }
				{startCase(shipment_type)}
			</div>
		</>
	);
}

export default ShipmentsCard;
