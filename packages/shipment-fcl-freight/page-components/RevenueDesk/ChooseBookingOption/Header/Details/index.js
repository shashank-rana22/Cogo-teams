import React, { useState } from 'react';
import { format } from '@cogoport/utils';
// import getFormattedPriceCurrency from '@cogo/bookings/utils/getFormattedPrice';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import SellServiceQuotation from './SellServiceQuotation';
import BuyServiceQuotation from './BuyServiceQuotation';
import styles from './styles.module.css'

const Details = ({ data }) => {
	const departure_date =
		data?.schedule_departure || data?.selected_schedule_departure;
	const cargoStuffingLocation =
		data?.fcl_freight_services?.[0]?.cargo_stuffing_location;
	const shippingLine = data?.shipping_line?.business_name;
	const preferredShippingLine = data?.preferred_shipping_line?.business_name;

	const [showQuotation, setShowQuotation] = useState(false);

	return (
		<>
			<div className={styles.detailsCon}>
				<div className={styles.detailLeft}>
					<div className={styles.detailKey}>
						Cargo Ready Date :
						<div className={styles.detailsText}>
							{format(data?.cargo_readiness_date, 'dd MMM yyyy')}
						</div>
					</div>
					<div className={styles.detailKey}>
						Expected Departure Date :
						<div className={styles.detailsText}>
							{format(departure_date, 'dd MMM yyyy')}
						</div>
					</div>
					<div className={styles.lead}>
						{`(${
							data?.free_days_detention_destination || 0
						} Free days detention)`}
					</div>
				</div>
				<div className={styles.detailLeft}>
					{cargoStuffingLocation ? (
						<div className={styles.detailKey}>
							Stuffing Location :
							<div className={styles.detailsText}>{cargoStuffingLocation}</div>
						</div>
					) : null}
					<div className={styles.pricetext}>
						<div className={styles.priceText}>
							Sell Price -{' '}
							{`(
								${data?.freight_total},
								${data?.freight_currency},
							)`}
						</div>
					</div>
				</div>
				<div className={styles.detailRight}>
					{preferredShippingLine ? (
						<div className={styles.detailKey}>
							Preferred Shipping Line :
							<div className={styles.detailsText}>{preferredShippingLine}</div>
						</div>
					) : null}
					{shippingLine ? (
						<div className={styles.detailKey}>
							Shipping Line :<div className={styles.detailsText}>{shippingLine}</div>
						</div>
					) : null}
				</div>
				<div className={styles.detailRight}>
					{data?.exchange_rate ? (
						<div className={styles.detailKey}>
							Exchange Rate :
							<div className={styles.detailsText}>{data?.exchange_rate}</div>
						</div>
					) : null}
					{data?.transit_days ? (
						<div className={styles.detailKey}>
							Transit Days :
							<div className={styles.detailsText}>{data?.transit_days}</div>
						</div>
					) : null}
				</div>
			</div>
			<div className={styles.balanceKey}>
				Discount Applied (KAM) -
				<div className={styles.detailsBal}>
					  {`( ${data?.discount_amount},
						${data?.discount_amount_currency},
                    )`}
				</div>
			</div>

			{!showQuotation ? (
				<div className={styles.serviceQuotation}
					onClick={() => {
						setShowQuotation(!showQuotation);
					}}
				>
					<div className={styles.text}>
						View Quotation <IcMArrowRotateDown />
					</div>
				</div>
			) : null}

			{showQuotation ? (
				<div>
					<div className={styles.quotationDetails}>
						<SellServiceQuotation shipmentData={data} />
						<BuyServiceQuotation shipmentData={data} />
					</div>

					<div className={styles.serviceQuotation}
						onClick={() => {
							setShowQuotation(!showQuotation);
						}}
					>
						<div className={styles.text}>
							Hide Quotation <IcMArrowRotateUp />
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};
export default Details;