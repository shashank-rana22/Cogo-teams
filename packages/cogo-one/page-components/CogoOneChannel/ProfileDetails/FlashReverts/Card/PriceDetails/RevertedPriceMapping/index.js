import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import {
	STATUS_PENDING,
	ORG_RESPONDED,
	REVERT_STATUS_LABEL_MAPPING,
	REVERTABLE_SERVICES,
} from '../../../../../../../constants/flashRatesMapping';
import getServicesUnitMapping from '../../../../../../../utils/getServicesUnitMapping';
import PriceRange from '../PriceRange';

import styles from './styles.module.css';

const geo = getGeoConstants();

const SERVICES_UNIT_MAPPING = getServicesUnitMapping();

function WinBooking({ item, setModalState = () => {}, type = '' }) {
	return (
		<div className={styles.rate_revert_flex}>
			<div className={styles.price_label}>
				Expected Price-
				<PriceRange item={item} />
			</div>
			{type !== 'closed_booking' && (
				<Button
					onClick={() => setModalState({ isOpen: true, data: { ...item } })}
					themeType="primary"
					size="sm"
					disabled={!REVERTABLE_SERVICES.includes(item?.service_type)}
				>
					Revert
				</Button>
			)}
		</div>
	);
}

function RevertedBooking({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.price_label}>
				Expected Price-
				<PriceRange item={item} />
			</div>
			<div className={styles.price_label}>
				Quoted Price-
				<span>
					{formatAmount({
						amount   : item?.reverted_buy_price,
						currency : item?.currency || geo.country.currency.code,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 2,
						},
					})}
					&nbsp;
					{SERVICES_UNIT_MAPPING[item?.service_type] || ''}
				</span>
			</div>
		</div>
	);
}

function ClosedBooking({ item }) {
	const { shipment_flash_booking_rate_tag = '' } = item || {};
	return (
		<div className={styles.rate_revert_flex}>
			<div>
				{STATUS_PENDING.includes(shipment_flash_booking_rate_tag) && (
					<WinBooking
						item={item}
						type="closed_booking"
					/>
				)}
				{ORG_RESPONDED.includes(shipment_flash_booking_rate_tag) && (
					<div className={styles.price_label}>
						Quoted Price-
						<span>
							{formatAmount({
								amount   : item?.reverted_buy_price,
								currency : item?.currency || geo.country.currency.code,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									maximumFractionDigits : 2,
								},
							})}
                        &nbsp;
							{SERVICES_UNIT_MAPPING[item?.service_type] || ''}
						</span>
					</div>
				)}
			</div>
			<div className={styles.closed_status}>
				{REVERT_STATUS_LABEL_MAPPING[shipment_flash_booking_rate_tag]}
			</div>
		</div>
	);
}

const REVERTED_PRICE_MAPPING = {
	win_bookings      : WinBooking,
	reverted_bookings : RevertedBooking,
	closed_bookings   : ClosedBooking,
};

export default REVERTED_PRICE_MAPPING;
