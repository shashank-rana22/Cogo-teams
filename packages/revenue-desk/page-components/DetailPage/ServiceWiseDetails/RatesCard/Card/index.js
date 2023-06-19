import { Pill, ProgressBar } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import PriorityNumber from './PriorityNumber';
import ShowSellRates from './ShowSellRates';
import styles from './styles.module.css';

function Card({
	data, setPrefrences, prefrences, rate_key, serviceData, setSellRates,
	sellRates, prefrence_key, fromkey, priority_no,
}) {
	const handlePrefrence = (rate) => {
		const foundItem = (prefrences?.[serviceData?.id] || []).find((obj) => obj?.rate_id === rate?.id);
		if (foundItem) {
			const oldItems = prefrences?.[serviceData?.id];
			const newRows = oldItems.filter((val) => val?.rate_id !== rate?.id);

			if (newRows?.length) {
				setPrefrences({ ...prefrences, [serviceData?.id]: [...newRows] });
			} else {
				setPrefrences({ ...prefrences, [serviceData?.id]: [] });
			}
		} else {
			const newList = prefrences?.[serviceData?.id] || [];
			newList.push({
				rate_id : rate?.id,
				id      : rate?.rowData?.service_provider?.id,
				key     : prefrence_key,
				data    : rate,
			});
			setPrefrences({ ...prefrences, [serviceData?.id]: [...newList] });
		}
	};
	const handleCardClick = (e) => {
		e.stopPropagation();
	};
	const showValidity = (item) => {
		if (item?.rowData?.is_rate_expired) {
			return <span style={{ color: 'red' }}> (This Rate is Expired)</span>;
		}

		if (item?.rowData?.validity_end) {
			return (
				<span style={{ color: 'red' }}>
					(Valid till:
					{' '}
					{format(data?.rowData?.validity_end, 'dd MMM YYYY')}
					)
				</span>
			);
		}
		return null;
	};
	const showData = (val) => val || '';
	const isShowSellRate = serviceData?.service_type === 'fcl_freight_service';
	const updated_at = data?.rowData?.updated_at;

	const handleLeftSectionPriority = (ratekey) => {
		if (ratekey === 'selected_rate') {
			return `${priority_no}.`;
		} if (ratekey === 'preferences_rate') {
			return `${data?.rowData?.priority}.`;
		} if (ratekey === 'not_preferences_rate') {
			return <IcMOverflowDot />;
		}
		return (
			<PriorityNumber
				data={prefrences?.[serviceData?.id]}
				id={data?.id}
				showPriority
			/>
		);
	};
	return (
		<div
			className={((rate_key === 'selected_rate') || (rate_key === 'preferences_rate'))
				? styles.selected_rate_card_container : styles.container}
			role="presentation"
			onClick={() => (!rate_key ? handlePrefrence(data) : null)}
		>
			<div className={styles.left_section_container}>
				{handleLeftSectionPriority(rate_key)}
			</div>
			<div className={styles.line} />
			<div className={styles.right_section_container}>
				<div className={styles.upper_section}>
					<div className={styles.upper_left_section}>
						<div className={styles.service_provider_heading}>
							{showData(data?.rowData?.service_provider?.business_name)}
						</div>
						<div>
							{serviceData?.service_type === 'air_freight_service'
								? showData(data?.rowData?.air_line)
								: showData(data?.rowData?.shipping_line)}
						</div>
						<div>
							{updated_at ? (
								<div className={styles.updated_at}>
									Last updated :
									{' '}
									{format(updated_at, 'dd MMM yy')}
								</div>
							) : null}
						</div>
					</div>
					<div style={{ display: 'flex' }}>
						{rate_key ? (<div><Pill size="md" color="#F2F3FA">{startCase(fromkey || data?.rowData?.source)}</Pill></div>
						) : null}
						{((data?.rowData?.selected_priority) && (data?.rowData?.selected_priority === data?.rowData?.priority)) ? (
							<div>
								<Pill size="md" color="#F9F9F9"><div style={{ color: '#7278AD' }}>So1 Selected Rate</div></Pill>
							</div>
						) : null}
					</div>
				</div>
				<div className={styles.lower_section}>
					<div className={styles.first_section}>
						<div className={styles.text1}>
							Active Bookings :
							{' '}
							{data?.rowData?.active_booking}
						</div>
						<div className={styles.text2}>
							{showValidity(data)}
						</div>
						{data?.rowData?.platform ? (
							<div>
								<Pill>
									{`Reverted from ${data?.rowData?.platform} platform`}
								</Pill>
							</div>
						) : null}
					</div>
					<div className={styles.progress_bar_section}>
						<div style={{ marginRight: '20px' }}>
							<div className={styles.text}>
								Allocation Ratio
							</div>
							<div className={styles.progress_bar_container}>
								<ProgressBar
									progress={Number(data?.rowData?.allocation_ratio) * 100 || Number(0.2) * 100}
									uploadText=" "
								/>
							</div>
						</div>
						<div>
							<div className={styles.text}>
								Fulfillment Ratio
							</div>
							<div className={styles.progress_bar_container}>
								<ProgressBar progress={Number(data?.rowData?.fulfillment_ratio) * 100} uploadText=" " />
							</div>
						</div>
					</div>
					<div className={styles.price_section}>
						<div style={{ display: 'flex' }}>
							<div>
								{startCase(serviceData?.service_type)}
								{' '}
								:
								&nbsp;
							</div>
							<div className={styles.price_value}>
								{formatAmount({
									amount   : data?.rowData?.total_buy_price,
									currency : data?.rowData?.total_buy_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
							</div>
						</div>
						<div>
							{
							data?.rowData?.origin_locals_price
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
								)
								: null
						}
							{
							data?.rowData?.origin_locals_price
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
								)
								: null
						}
						</div>
					</div>
					<div className={styles.total_price_section}>
						<div style={{ display: 'flex' }}>
							Profitability : &nbsp;
							<div className={Number(data?.rowData?.profit_percentage) > 0
								? styles.positive_profit : styles.negative_profit}
							>
								{Number(data?.rowData?.profit_percentage).toFixed(2)}
								%
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

			</div>
		</div>

	);
}

export default Card;
