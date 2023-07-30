import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import CargoDetails from './CargoDetails';
import HeaderBlock from './HeaderBlock';
import { iconMapping } from './iconsMapping';
import ShippingRoute from './ShippingRoute';
import styles from './styles.module.css';

function ShipmentsCard({ setShowPocDetails = () => {}, shipmentItem = {}, type = '' }) {
	const {
		shipment_type = '',
		net_total = 0,
		net_total_price_currency = '',
		payment_term : paymentTerm = '',
		milestone_activity = [],
	} = shipmentItem;

	const milestoneActivity = [...milestone_activity].reverse();

	const currentEvent = milestone_activity.find((itm) => itm?.completed_on);
	const nextEvent = milestoneActivity.find((itm) => !itm?.completed_on);

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
							{paymentTerm }
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
				<div className={styles.footer_left_block}>
					<Pill size="md" color="#CFEAED">
						{currentEvent?.milestone || 'Booking Placed'}
					</Pill>
				</div>

				<div className={styles.footer_right_block}>
					Next:
					{' '}
					{nextEvent?.milestone || 'Booking Confirmation'}
				</div>
			</div>

			<div className={styles.shipment_type_container}>
				{iconMapping?.[shipment_type]}

				{startCase(shipment_type)}
			</div>
		</>
	);
}

export default ShipmentsCard;
