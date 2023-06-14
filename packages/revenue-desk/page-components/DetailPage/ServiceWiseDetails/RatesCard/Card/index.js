import { Pill } from '@cogoport/components';
import { IcMDrag } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import PriorityNumber from './PriorityNumber';
import ShowSellRates from './ShowSellRates';
import styles from './styles.module.css';

function Card({
	data, setPrefrences, prefrences, rate_key, serviceData, setSellRates,
	sellRates, price, prefrence_key, fromkey,
}) {
	const handlePrefrence = (rate) => {
		const foundItem = (prefrences?.[serviceData?.id] || []).find((obj) => obj?.rate_id === rate?.id);
		if (foundItem) {
			const oldItems = prefrences?.[serviceData?.id];
			const newRows = oldItems.filter((val) => val?.rate_id !== rate?.id);

			if (newRows.length) {
				setPrefrences({ ...prefrences, [serviceData?.id]: [...newRows] });
			} else {
				setPrefrences({ ...prefrences, [serviceData?.id]: [] });
			}
		} else {
			const newList = prefrences?.[serviceData?.id] || [];
			const priority = newList.length ? Number(newList[newList.length - 1]?.priority) + 1 : 1;
			newList.push({
				rate_id : rate?.id,
				id      : rate?.rowData?.service_provider?.id,
				priority,
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
	let profitability = 0;
	if (data?.rowData?.total_buy_price !== 0) {
		profitability = (Number(price?.split(' ')?.[1]) - Number(data?.rowData?.total_buy_price))
		/ Number(data?.rowData?.total_buy_price);
	}

	return (
		<div
			className={rate_key ? styles.selected_rate_card_container : styles.container}
			role="presentation"
			onClick={() => (!rate_key ? handlePrefrence(data) : null)}
		>
			<div className={styles.left_section_container}>
				{rate_key ? <IcMDrag /> : (
					<PriorityNumber
						data={prefrences?.[serviceData?.id]}
						id={data?.id}
						showPriority
					/>
				)}
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
					</div>
					{rate_key ? (
						<div>
							<Pill size="md" color="#F2F3FA">{fromkey}</Pill>
						</div>
					) : null}

				</div>
				<div className={styles.lower_section}>
					<div className={styles.first_section}>
						<div className={styles.text1}>
							Active Bookings :
							{' '}
							{showData(data?.rowData?.active_booking)}
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
						<div style={{ marginRight: '25px' }}>
							<div className={styles.text}>
								Allocation Ratio
							</div>
							<div>
								{data?.rowData?.allocation_ratio}

							</div>
						</div>
						<div>
							<div className={styles.text}>
								Fulfillment Ratio
							</div>
							<div>
								{data?.rowData?.fulfillment_ratio}
								%
							</div>
						</div>
					</div>
					<div className={styles.price_section}>
						<div className={styles.price_text}>
							<div>
								Origin Local Price:
								{data?.rowData?.origin_locals_price}
								Destination Local Price:
								{data?.rowData?.destination_locals_price}
							</div>
							<div>
								{serviceData?.shipment_type === 'air_freight' ? (
									<div>
										Buy Rate Per Kg:
										<span style={{ fontSize: '18px', fontWeight: '600', color: '#4F4F4F' }}>
											{`${showData(data?.rowData?.currency)} ${showData(
												data?.rowData?.buy_price,
											)}`}
										</span>
									</div>
								) : null}
								{serviceData?.shipment_type === 'fcl_freight' ? (
									<div>
										Buy Rate Per Contr.:
										<span style={{ fontSize: '18px', fontWeight: '600', color: '#4F4F4F' }}>
											{`${showData(data?.rowData?.currency)} ${showData(
												data?.rowData?.buy_price,
											)}`}
										</span>
									</div>
								) : null}
							</div>
							<div>
								{serviceData?.service_type === 'air_freight_service' && (
									<div>
										Price Type:
										{' '}
										{showData(startCase(data?.rowData?.price_type))}
									</div>
								)}
							</div>
							<div>
								{serviceData?.service_type === 'air_freight_service' && (
									<div>
										Chargeable Wt.:
										{showData(data?.rowData?.chargeable_weight)}
										{' '}
										Kg
									</div>
								)}
								{serviceData?.service_type === 'fcl_freight_service' && (
									<div>
										Container Count.:
										{showData(data?.rowData?.container_count)}
									</div>
								)}
							</div>
						</div>
						<div className={styles.price_text}>
							<div>
								Profitability :
								<span style={{ color: '#849E4C' }}>
									<div>
										{Number(profitability.toFixed(4))}
									</div>
								</span>
							</div>
							Total Buy Price  :
							<div>
								{data?.rowData?.currency}
								{' '}
								{data?.rowData?.total_buy_price}
							</div>
						</div>
					</div>
					{isShowSellRate && (
						<div role="presentation" className={styles.edit_price_section} onClick={handleCardClick}>
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
