import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import { iconMapping } from './iconsMapping';
import PocContainer from './PocContainer';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentCard({
	shipmentItem = {},
	showPocDetails = {},
	setShowPocDetails = () => {},
	setActiveTab = () => {},
}) {
	const {
		shipment_type = '',
		serial_id = '',
		net_total = 0,
		net_total_price_currency = '',
		payment_term : paymentTerm = '',
	} = shipmentItem;

	if (!isEmpty(showPocDetails) && showPocDetails?.serial_id === serial_id) {
		return (
			<div className={styles.container}>
				<PocContainer
					showPocDetails={showPocDetails}
					setShowPocDetails={setShowPocDetails}
					setActiveTab={setActiveTab}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_block}>
				<HeaderBlock
					shipmentItem={shipmentItem}
					setShowPocDetails={setShowPocDetails}
				/>

				<ShippingRoute
					shipmentItem={shipmentItem}
				/>

				<CargoDetails
					detail={shipmentItem}
					service={shipment_type}
				/>

				<div className={styles.price_details}>
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

					{paymentTerm ? (
						<Pill size="md" color="#BBFCBD">
							{paymentTerm }
						</Pill>
					) : null}
				</div>
			</div>

			<div className={styles.footer_block}>
				<div className={styles.footer_left_block}>
					<Pill size="md" color="#4BAE4F">
						Booking Placed
					</Pill>
				</div>

				<div className={styles.footer_right_block}>
					Next: Booking Confirmation
				</div>
			</div>

			<div className={styles.shipment_type_container}>
				{iconMapping?.[shipment_type]}

				{startCase(shipment_type)}
			</div>
		</div>
	);
}

export default ShipmentCard;
