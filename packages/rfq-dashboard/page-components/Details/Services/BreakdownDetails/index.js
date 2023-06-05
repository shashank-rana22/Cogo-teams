import { Button, cl, Toast } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { convertCurrencyValue, displayTotal } from '../../../../utils/dynamicValues';
import getBreakdown from '../../../../utils/getBreakdown';
import getTotalMarginSum from '../../../../utils/getTotalMarginSum';
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
	setEditedMargins = () => { },
	primaryService = {},
	convenienceDetails = {},
	updateMargin,
	rfq_rate_card_id = '',
	refetchRateCards,
	setShowPrice,
	getRfqsForApproval,
	margin_limit,
	rfq_state = '',
}) {
	const { query } = useRouter();
	const { rfq_id = '' } = query;
	let profitability = 0.0;

	// const [profitability, setProfitability] = useState(0);
	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[0];

	const rateDetails = getBreakdown(rate);
	rateDetails.splice(0, 1);
	rateDetails.splice(rateDetails.length - 1, 1);

	console.error('rate::', rate);

	let total = 0;

	const { totalAmount } = getTotalMarginSum({
		editedMargins,
		currency_conversion: conversions,
		rate,
	});

	const convenience_fee = convertCurrencyValue(
		(convenienceDetails?.convenience_rate?.price || 0)
		* (convenience_line_item?.quantity || 1),
		convenienceDetails?.convenience_rate?.currency,
		rate?.total_price_currency,
		conversions,
	);

	const save_card_margins = async () => {
		try {
			await updateMargin({
				editedMargins,
				convenienceDetails,
				rfq_rate_card_id,
			});
			setShowPrice({});
			await refetchRateCards({ rfq_id });
			await getRfqsForApproval();
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	const currencyConversion = (item) => {
		const serviceKey = item?.id;
		const serviceEditedMargins = editedMargins?.[serviceKey];

		const totalDisplay = displayTotal(
			{

				lineItems     : item?.line_items || [],
				editedMargins : serviceEditedMargins,
				conversions,
				toCurrency    : item?.total_price_currency,
			},

		);

		total = convertCurrencyValue(
			Number(Math.floor(totalDisplay)),
			item?.total_price_currency,
			rate?.total_price_currency,
			conversions,
		);
		return {
			totalDisplay,
			serviceKey,
			total,
		};
	};

	console.error('editedMargins::', editedMargins);

	console.error('k::', totalAmount);
	console.error('editedMargins::', editedMargins, total);

	console.error('profitability::', profitability, typeof profitability);

	(rateDetails || []).forEach((item) => {
		total += currencyConversion(item).total;
	});

	if (total !== totalAmount) {
		profitability = (totalAmount / (total - totalAmount)) * 100;
	}

	console.error('after totalAmount', totalAmount, 'total::', total);

	console.error(' after profitability::', profitability, typeof profitability);

	return (
		<div className={styles.container}>
			<Header margin_limit={margin_limit} />
			<div>
				{(rateDetails || []).map((item) => {
					const { totalDisplay, serviceKey } = currencyConversion(item);
					console.error('totalDisplay::', totalDisplay);

					return (
						<ServiceMargin
							item={item}
							editedMargins={editedMargins}
							detail={detail}
							primaryService={primaryService}
							conversions={conversions}
							totalDisplay={totalDisplay}
							setEditedMargins={setEditedMargins}
							key={serviceKey}
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
								key={isEmpty(convenienceDetails)}
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
						Projected Revenue :
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
					<div
						className={cl`${styles.title_value} ${profitability > 0 ? styles.green : styles.red}
					${profitability === 0 ? styles.black : ''}`}
					>
						{profitability.toFixed(3)}
						{' '}
						%
					</div>
				</div>
				<Button
					size="md"
					themeType="secondary"
					onClick={save_card_margins}
					disabled={rfq_state === 'approved'}
				>
					Save Changes

				</Button>
			</div>
		</div>
	);
}

export default BreakdownDetails;
