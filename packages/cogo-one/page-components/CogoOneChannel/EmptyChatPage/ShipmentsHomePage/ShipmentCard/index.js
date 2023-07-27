import { Pill, Avatar } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import PocContainer from './PocContainer';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentCard({
	shipmentItem = {},
	showPocDetails = {},
	setShowPocDetails = () => {},
}) {
	const {
		shipment_type = '',
		shipping_line = {},
		net_total = 0,
		net_total_price_currency = '',
	} = shipmentItem;

	if (!isEmpty(showPocDetails) && showPocDetails?.sid === shipmentItem.sid) {
		return (
			<div className={styles.container}>
				<PocContainer
					showPocDetails={showPocDetails}
					setShowPocDetails={setShowPocDetails}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_block}>
				<HeaderBlock shipmentItem={shipmentItem} setShowPocDetails={setShowPocDetails} />

				<div className={styles.service_provider_details}>
					<Avatar
						size={40}
						personName={shipping_line?.business_name}
					/>

					<div className={styles.service_provider_name}>
						{shipping_line?.business_name}
					</div>
				</div>

				<ShippingRoute shipmentItem={shipmentItem} />

				<CargoDetails detail={shipmentItem} service={shipment_type} />

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
					<Pill size="md" color="#BBFCBD">
						Pay Later
					</Pill>
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
		</div>
	);
}

export default ShipmentCard;
