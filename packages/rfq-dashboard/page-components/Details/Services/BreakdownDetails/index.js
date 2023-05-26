import { Button } from '@cogoport/components';
import 	formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';

import { convertCurrencyValue, displayTotal } from '../../../../utils/dynamicValues';
import getBreakdown from '../../../../utils/getBreakdown';
import getWidth from '../../../../utils/getWidth';

import Convenience from './Convenience';
import Header from './header';
import ServiceMargin from './ServiceMargin';
import styles from './styles.module.css';

function BreakdownDetails({
	detail,
	rate,
	conversions,
	editedMargins = {},
	setEditedMargins = () => {},
	primaryService = {},
	convenienceDetails = {},
	setConvenienceDetails = () => {},
	updateMargin,
	rfq_rate_card_id = '',
	refetchRateCards,
	setShowPrice,
}) {
	const { query } = useRouter();
	const { rfq_id = '' } = query;
	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[0];

	const rateDetails = getBreakdown(rate);
	rateDetails.splice(0, 1);
	rateDetails.splice(rateDetails.length - 1, 1);

	const handleConvenienceFeeChange = (v) => {
		setConvenienceDetails(v);
	};

	let total = 0;

	const convenience_fee = convertCurrencyValue(
		(convenienceDetails?.convenience_rate?.price || 0)
			* (convenience_line_item?.quantity || 1),
		convenienceDetails?.convenience_rate?.currency,
		rate?.total_price_currency,
		conversions,
	);

	const save_card_margins = () => {
		updateMargin({
			editedMargins,
			convenienceDetails,
			rfq_rate_card_id,
		});
		setShowPrice({});
		refetchRateCards({ rfq_id });
	};

	return (
		<div className={styles.container}>
			<Header />
			<div>
				{(rateDetails || []).map((item) => {
					const serviceKey = item?.id;
					const serviceEditedMargins = editedMargins?.[serviceKey];

					const totalDisplay = displayTotal(
						item?.line_items || [],
						serviceEditedMargins,
						conversions,
						item?.total_price_currency,
					);

					total += convertCurrencyValue(
						Number(Math.floor(totalDisplay)),
						item?.total_price_currency,
						rate?.total_price_currency,
						conversions,
					);

					return (
						<ServiceMargin
							item={item}
							editedMargins={editedMargins}
							detail={detail}
							primaryService={primaryService}
							conversions={conversions}
							totalDisplay={totalDisplay}
							setEditedMargins={setEditedMargins}
						/>
					);
				})}
			</div>

			<div className={styles.divider} />

			{convenience_line_item?.total_price_discounted !== 0 ? (
				<>
					<div className={styles.service_line}>
						<div className={styles.service_title}>Convenience Fee</div>
						<div className={styles.service_total_amount}>
							{formatAmount({
								amount   : convenience_fee,
								currency : rate?.total_price_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}
						</div>
					</div>

					<div className={styles.convenience_container}>
						<div className={styles.col} style={{ width: getWidth(4.6), paddingLeft: '0px' }}>
							Convenience Rate

						</div>
						<div className={styles.col} style={{ width: getWidth(5.7) }}>
							<Convenience
								onChange={handleConvenienceFeeChange}
								convenienceDetails={convenienceDetails}
								convenience_line_item={convenience_line_item}
							/>
						</div>
						<div className={styles.col} style={{ width: getWidth(2.1) }}>
							{formatAmount({
								amount:
									(convenienceDetails?.convenience_rate?.price || 0)
									* (convenience_line_item?.quantity || 1),
								currency : convenience_line_item?.currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
								},
							})}

						</div>
					</div>
				</>
			) : null}

			<div>
				<div className={styles.table_footer}>
					<div className={styles.total_title}>TOTAL</div>
					<div className={styles.total_title}>
						{formatAmount({
							amount   : total + convenience_fee,
							currency : rate?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</div>
				</div>
			</div>
			<div className={styles.info_footer}>
				<div className={styles.info_title}>
					<div className={styles.footer_title}>
						Projected Revenue:
					</div>
					<div className={styles.title_value}>
						{formatAmount({
							amount   : total + convenience_fee,
							currency : rate?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						})}
					</div>
				</div>
				<div className={styles.info_title}>
					<div className={styles.footer_title}>
						Projected Profitability :
					</div>
					<div className={styles.title_value}>
						2.6%
					</div>
				</div>
				{/* <div className={styles.info_title}>
					<div className={styles.footer_title}>
						Price / Ctr :
					</div>
					<div className={styles.title_value}>
						$18,000
					</div>
				</div> */}
				<Button
					size="md"
					themeType="secondary"
					onClick={save_card_margins}
				>
					Save Changes

				</Button>
			</div>
		</div>
	);
}

export default BreakdownDetails;
