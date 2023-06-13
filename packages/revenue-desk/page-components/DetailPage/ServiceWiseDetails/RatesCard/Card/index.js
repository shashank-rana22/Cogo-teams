import { Pill } from '@cogoport/components';
import { IcMDrag } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';

import PriorityNumber from './PriorityNumber';
import ShowSellRates from './ShowSellRates';
import styles from './styles.module.css';

function Card({
	data, setPrefrences, prefrences, rate_key, serviceId, shipmentType, setSellRates,
	sellRates, price,
}) {
	const handlePrefrence = (rate) => {
		const foundItem = (prefrences?.[serviceId] || []).find((obj) => obj?.rate_id === rate?.id);
		if (foundItem) {
			const oldItems = prefrences?.[serviceId];
			const newRows = oldItems.filter((val) => val?.rate_id !== rate?.id);

			if (newRows.length) {
				setPrefrences({ ...prefrences, [serviceId]: [...newRows] });
			} else {
				setPrefrences({ ...prefrences, [serviceId]: [] });
			}
		} else {
			const newList = prefrences?.[serviceId] || [];
			const priority = newList.length ? Number(newList[newList.length - 1]?.priority) + 1 : 1;
			newList.push({
				rate_id : rate?.id,
				id      : rate?.service_provider?.id,
				priority,
				data    : rate,
			});
			setPrefrences({ ...prefrences, [serviceId]: [...newList] });
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
	const isShowSellRate = shipmentType === 'fcl_freight';
	const profitability = (Number(price?.split(' ')?.[1]) - Number(data?.rowData?.total_buy_price))
	/ Number(data?.rowData?.total_buy_price);
	console.log(profitability, 'ooooo');
	return (
		<div
			className={rate_key ? styles.selected_rate_card_container : styles.container}
			role="presentation"
			onClick={() => (!rate_key ? handlePrefrence(data) : null)}
		>
			<div className={styles.left_section_container}>
				{rate_key ? <IcMDrag /> : <PriorityNumber data={prefrences?.[serviceId]} id={data?.id} showPriority />}
			</div>
			<div className={styles.line} />
			<div className={styles.right_section_container}>
				<div className={styles.upper_section}>
					<div className={styles.upper_left_section}>
						<div className={styles.service_provider_heading}>
							{showData(data?.rowData?.service_provider)}
						</div>
						<div>
							{shipmentType === 'air_freight'
								? showData(data?.rowData?.air_line)
								: showData(data?.rowData?.shipping_line)}
						</div>
					</div>
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
								{data?.rowData?.fullfillment_ratio}
								%
							</div>
						</div>
					</div>
					<div className={styles.price_section}>
						<div className={styles.price_text}>
							<div>
								Buy Rate per Ctr  :
								<span style={{ fontSize: '18px', fontWeight: '600', color: '#4F4F4F' }}>
									{`${showData(data?.rowData?.currency)} ${showData(
										data?.rowData?.buy_price,
									)}`}
								</span>
							</div>
							<div>
								{shipmentType === 'air_freight' && (
									<div>
										Price Type:
										{' '}
										{showData(startCase(data?.rowData?.price_type))}
									</div>
								)}
							</div>
							<div>
								{shipmentType === 'air_freight' && (
									<div>
										Chargeable Wt.:
										{showData(data?.rowData?.chargeable_weight)}
										{' '}
										Kg
									</div>
								)}
								{shipmentType === 'fcl_freight' && (
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
					{/* {isShowSellRate && ( */}
					<div role="presentation" className={styles.edit_price_section} onClick={handleCardClick}>
						<ShowSellRates
							data={data}
							sellRates={sellRates}
							setSellRates={setSellRates}
						/>
					</div>
					{/* )} */}
				</div>
			</div>
		</div>
	);
}
export default Card;
