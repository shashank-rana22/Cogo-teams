import { Pill, Popover, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { DECIMAL_PLACES, PERCENTAGE_CHECK, VALUE_ZERO } from '../../../../constants';

import ShowLineItems from './ShowLineItems';
import ShowSellRates from './ShowSellRates';
import showValidity from './showValidity';
import styles from './styles.module.css';

function Footer({ data, shipmentData, singleServiceData, setSellRates, sellRates, prefrence_key }) {
	const lineItems = data?.rowData?.line_items || [];
	const originLocalsLineItems = data?.rowData?.origin_locals?.line_items || [];
	const destinationLocalsLineItems = data?.rowData?.destination_locals?.line_items || [];
	const isDisplayLineItems = !isEmpty([...lineItems, ...originLocalsLineItems, ...destinationLocalsLineItems]);
	const isShowSellRate = singleServiceData?.service_type === 'fcl_freight_service';
	const [showLineItems, setShowLineItems] = useState(false);
	const [showRemarks, setShowRemarks] = useState(false);

	const isExpired = (rowData) => (
		prefrence_key === 'System Rates'
			&& rowData?.validity_end <= shipmentData?.schedule_departure
	);
	const handleCardClick = (e) => {
		e.stopPropagation();
	};
	return (
		<div className={styles.lower_section}>
			<div className={styles.first_section}>
				<div className={styles.text1}>
					Active Bookings :
					{data?.rowData?.active_booking}
				</div>
				<div className={styles.text2}>
					{showValidity(data)}
				</div>
				<div className={styles.text2}>
					{isExpired(data?.rowData, shipmentData)}
				</div>
				{data?.rowData?.platform ? (
					<div>
						<Pill>
							{`Reverted from ${data?.rowData?.platform} platform`}
						</Pill>
					</div>
				) : null}
				{data?.rowData?.remarks ? (
					<Popover
						placement="bottom"
						trigger="mouseenter"
						render={(
							<div className={styles.text}>
								{data?.rowData?.remarks}
							</div>
						)}
					>
						<div
							className={styles.text3}
							onClick={() => setShowRemarks(!showRemarks)}
							role="button"
							tabIndex={0}
						>
							remarks :
							{' '}
							<span style={{ textDecoration: 'underline' }}>view</span>
						</div>
					</Popover>
				) : null}
			</div>
			<div className={styles.progress_bar_section}>

				<div style={{ marginRight: '20px' }}>
					<div className={styles.text}>
						Allocation Ratio
						{' '}
						<Tooltip
							content="
                            Total bookings accepted by supplier / Total bookings promised to supplier (30 days)"
							placement="top"
						>
							<div className={styles.infoicon}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						{data?.rowData?.allocation_ratio || '--'}
					</div>
				</div>

				<div>
					<div className={styles.text}>
						Fulfillment Ratio
						{' '}
						<Tooltip content="(Total Bookings given By SO1-cancelled)/Total bookings given" placement="top">
							<div className={styles.infoicon}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>
					<div className={styles.text}>
						2 Days :
						{' '}
						{data?.rowData?.fulfillment_ratio_2 || '--'}
					</div>
					<div className={styles.text}>
						7 Days:
						{' '}
						{data?.rowData?.fulfillment_ratio_7 || '--'}
					</div>
					<div className={styles.text}>
						30 Days:
						{' '}
						{data?.rowData?.fulfillment_ratio_30 || '--'}
					</div>
				</div>

			</div>
			<div className={styles.price_section}>
				<div style={{ display: 'flex' }}>
					<div>
						{startCase(singleServiceData?.service_type)}
						{' '}
						:
						&nbsp;
					</div>
					<div className={styles.price_value}>
						{formatAmount({
							amount   : data?.rowData?.total_price,
							currency : data?.rowData?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
						{' '}
						|
						{' '}
						{formatAmount({
							amount   : data?.rowData?.total_price_in_preferred_currency,
							currency : data?.rowData?.preferred_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
					{isDisplayLineItems ? (
						<Popover
							placement="top"
							trigger="mouseenter"
							render={(
								<ShowLineItems
									serviceType={singleServiceData?.service_type}
									lineItems={lineItems}
									originLocalLineItems={originLocalsLineItems}
									destinationLocalLineItems={destinationLocalsLineItems}
								/>
							)}
						>
							<div
								onClick={() => setShowLineItems(!showLineItems)}
								style={{ textDecoration: 'underline' }}
								role="button"
								tabIndex={0}
							>
								view more
							</div>
						</Popover>
					) : null}
				</div>
				<div>
					{data?.rowData?.origin_locals_price
						? (
							<div style={{ display: 'flex' }}>
								Origin Local Price :
								&nbsp;
								<div className={styles.price_value}>
									{formatAmount({
										amount   : data?.rowData?.origin_locals_price,
										currency : data?.rowData?.origin_locals_price_currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 2,
										},
									})}
								</div>
							</div>
						) : null}
					{data?.rowData?.destination_locals_price
						? (
							<div style={{ display: 'flex' }}>
								Destination Local Price :
								&nbsp;
								<div className={styles.price_value}>
									{formatAmount({
										amount   : data?.rowData?.destination_locals_price,
										currency : data?.rowData?.destination_locals_price_currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 2,
										},
									})}
								</div>
							</div>
						) : null}
				</div>
			</div>
			<div className={styles.total_price_section}>
				<div style={{ display: 'flex' }}>
					Profitability : &nbsp;
					<div className={Number(data?.rowData?.profit_percentage) > PERCENTAGE_CHECK
						? styles.positive_profit : styles.negative_profit}
					>
						{Number(data?.rowData?.profit_percentage).toFixed(DECIMAL_PLACES)}
						%
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					Profit : &nbsp;
					<div className={Number(data?.rowData?.profit) > VALUE_ZERO
						? styles.positive_profit : styles.negative_profit}
					>
						{formatAmount({
							amount   : data?.rowData?.profit,
							currency : data?.rowData?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			</div>
			{isShowSellRate && (
				<div
					role="presentation"
					className={styles.edit_price_section}
					onClick={handleCardClick}
				>
					<div className={styles.edit_price_heading}>Sell Rate / Contr.</div>
					<ShowSellRates
						data={data}
						sellRates={sellRates}
						setSellRates={setSellRates}
					/>
				</div>
			)}

		</div>
	);
}

export default Footer;
