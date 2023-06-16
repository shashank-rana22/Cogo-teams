import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

function Card({ singleRateCardData, index, singleServiceData, price }) {
	let profitability = 0;
	if (data?.rowData?.total_buy_price !== 0) {
		profitability = (Number(parseFloat(price?.replace(/[^0-9.-]+/g, ''))) - Number(singleRateCardData?.buy_rate_preferences?.total_buy_price))
		/ Number(singleRateCardData?.buy_rate_preferences?.total_buy_price);
	}
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				{index + 1}.
			</div>
			<div className={styles.right_section}>
				<div className={styles.upper_section}>
					<div className={styles.upper_left_section}>
						<div className={styles.service_provider_text}>
							{singleRateCardData?.data?.[0]?.service_provider?.business_name}
						</div>
						<div>
							{singleRateCardData?.data?.[0]?.airline
								? singleRateCardData?.data?.[0]?.airline?.business_name : null}
						</div>
					</div>
					<div className={styles.upper_right_section}>
						<Pill size="md" color="#F9F9F9">{startCase(singleRateCardData?.source)}</Pill>
					</div>
				</div>
				<div className={styles.lower_section}>
					<div className={styles.first_section}>
						<div className={styles.active_booking_label}>
							Active Bookings :
							{' '}
							{singleRateCardData?.buy_rate_preferences?.active_bookings }
						</div>       
					</div>
					<div className={styles.second_section}>
						<div>
							<div className={styles.text}>Allocation Ratio</div>
							<div>
								{singleRateCardData?.buy_rate_preferences?.allocation_ratio
									? singleRateCardData?.buy_rate_preferences?.allocation_ratio : 0}
								%

							</div>
						</div>
						<div>
							<div className={styles.text}>Fulfillment Ratio</div>
							<div>
								{singleRateCardData?.buy_rate_preferences?.fulfillment_ratio
									? singleRateCardData?.buy_rate_preferences?.fulfillment_ratio : 0}
								%

							</div>
						</div>
					</div>
					<div className={styles.third_section}>
						<div className={styles.price_text}>
							Buy Price :
							{' '}
							{singleRateCardData?.buy_rate_preferences?.buy_price}
						</div>
						{
                                singleRateCardData?.buy_rate_preferences?.origin_local_buy_price ? (
								<div className={styles.price_text}>
									Origin Local Price :
									{singleRateCardData?.buy_rate_preferences?.origin_local_buy_price}
								</div>
                                ) : null
                            }
						{
                                singleRateCardData?.buy_rate_preferences?.destination_local_buy_price
                                	? (
									<div className={styles.price_text}>
										Destination Local Price :
										{singleRateCardData?.buy_rate_preferences?.destination_local_buy_price}
									</div>
                                	) : null
                        }

					</div>
					<div className={styles.forth_section}>
						<div className={styles.probabilty_container}>
							Total Buy Price :
							<div className={styles.total_price_text}>
										{formatAmount({
												amount   :netTotalBuyPrice,
												currency :data?.rowData?.total_buy_currency,
												options  : {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 2,
												},
										})}
								{total_buy_price}
							</div>
						</div>
						<div className={styles.probabilty_container}>
							Probabilty:
							<div className={styles.profit_text}>
								{Number(profitability).toFixed(4)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
