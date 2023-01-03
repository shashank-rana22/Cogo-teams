import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import { format } from '@cogoport/utils';
import React from 'react';

import BuyServiceQuotation from './BuyServiceQuotation';
import SellServiceQuotation from './SellServiceQuotation';
import styles from './styles.module.css';

function Details({ data = {} }) {
	const departure_date =		data.schedule_departure || data.selected_schedule_departure;
	const cargoStuffingLocation =		data.fcl_freight_services?.[0].cargo_stuffing_location;
	const shippingLine = data.shipping_line?.business_name;
	const preferredShippingLine = data.preferred_shipping_line?.business_name;

	return (
		<>
			<div className={styles.details_container}>
				<div className={styles.detail_left}>
					<div className={styles.detail_key}>
						Cargo Ready Date :
						<div className={styles.details_text}>
							{format(data.cargo_readiness_date, 'dd MMM yyyy')}
						</div>
					</div>
					<div className={styles.detail_key}>
						Expected Departure Date :
						<div className={styles.details_text}>
							{format(departure_date, 'dd MMM yyyy')}
						</div>
					</div>
					<div className={styles.lead}>
						{`(${
							data.free_days_detention_destination || 0
						} Free days detention)`}
					</div>
				</div>
				<div className={styles.detail_left}>
					{cargoStuffingLocation ? (
						<div className={styles.detail_key}>
							Stuffing Location :
							<div className={styles.details_text}>{cargoStuffingLocation}</div>
						</div>
					) : null}
					<div className={styles.price_text_container}>
						<div className={styles.price_text}>
							Sell Price -
							{' '}
							{getFormattedPrice('en-IN', data.freight_total, data.freight_currency)}
						</div>
					</div>
				</div>
				<div className={styles.detail_right}>
					{preferredShippingLine ? (
						<div className={styles.detail_key}>
							Preferred Shipping Line :
							<div className={styles.details_text}>{preferredShippingLine}</div>
						</div>
					) : null}
					{shippingLine ? (
						<div className={styles.detail_key}>
							Shipping Line :
							<div className={styles.details_text}>{shippingLine}</div>
						</div>
					) : null}
				</div>
				<div className={styles.detail_right}>
					{data.exchange_rate ? (
						<div className={styles.detail_key}>
							Exchange Rate :
							<div className={styles.details_text}>{data.exchange_rate}</div>
						</div>
					) : null}
					{data.transit_days ? (
						<div className={styles.detail_key}>
							Transit Days :
							<div className={styles.details_text}>{data.transit_days}</div>
						</div>
					) : null}
				</div>
			</div>
			<div className={styles.balance_key}>
				Discount Applied (KAM) -
				<div className={styles.details_balance}>
					{getFormattedPrice('en-IN', data.discount_amount, data.discount_amount_currency)}
				</div>
			</div>

			<div>
				<div className={styles.quotation_details}>
					<SellServiceQuotation shipmentData={data} />
					<BuyServiceQuotation shipmentData={data} />
				</div>
			</div>

		</>
	);
}
export default Details;
