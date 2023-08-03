import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import { ICONS_MAPPING } from './iconsMapping';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentsCard({ setShowPocDetails = () => {}, shipmentItem = {}, type = '' }) {
	const {
		shipment_type = '',
		net_total = 0,
		net_total_price_currency = '',
		payment_term : paymentTerm = '',
		last_milestone = '',
		current_milestone = '',
	} = shipmentItem;

	const ShipmentIcon = ICONS_MAPPING[shipment_type] || null;

	return (
		<>
			<div className={styles.main_block}>
				<HeaderBlock
					shipmentItem={shipmentItem}
					setShowPocDetails={setShowPocDetails}
					type={type}
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
					prev:
					{' '}
					{last_milestone}
				</div>

				<div className={styles.footer_left_block}>
					<div className={styles.custom_pill_styles}>
						{current_milestone}
					</div>
				</div>
			</div>

			<div className={styles.shipment_type_container}>
				{ShipmentIcon && <ShipmentIcon className={styles.ship_icon} /> }
				{startCase(shipment_type)}
			</div>
		</>
	);
}

export default ShipmentsCard;
