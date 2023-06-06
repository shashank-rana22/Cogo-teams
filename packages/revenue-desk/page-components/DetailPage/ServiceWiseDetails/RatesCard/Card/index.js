import { IcMProfile, IcMDrag, IcMAirport, IcMShip } from '@cogoport/icons-react';

import PriorityNumber from './PriorityNumber';
import styles from './styles.module.css';

function Card({ data, setPrefrences, prefrences, rate_key, serviceId }) {
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
							{data?.service_provider?.business_name}
						</div>
						<div>
							{data?.airline ? (
								<div style={{ display: 'flex', alignItems: 'center' }}>
									{(data?.airline?.logo_url !== null)
										? (
											<img
												src={data?.airline?.logo_url}
												alt="logo"
												height="30px"
												width="50px"
											/>
										) : <IcMAirport height="30px" width="50px" />}

									<div style={{ fontSize: '14px', fontWeight: '500', color: '#4F4F4F' }}>
										{data?.airline?.business_name}
									</div>
								</div>
							)
								: (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{data?.shipping_line?.logo_url !== null
											? (
												<img
													src={data?.shipping_line?.logo_url}
													alt="logo"
													height="30px"
													width="50px"
												/>
											) : <IcMShip height="30px" width="50px" />}
										<div style={{ fontSize: '14px', fontWeight: '500' }}>
											{data?.shipping_line?.business_name}
										</div>
									</div>
								)}
						</div>
					</div>
					<div className={styles.upper_right_section}>
						<IcMProfile />
						<div className={styles.supply_agent_text}>
							Supply Agent : Himali Saini
						</div>
					</div>
				</div>
				<div className={styles.lower_section}>
					<div className={styles.first_section}>
						<div className={styles.text1}>
							Valid Till :10 June 2023
						</div>
						<div className={styles.text2}>
							Active Bookings :10 (50 TEU)
						</div>
					</div>
					<div className={styles.progress_bar_section}>
						<div style={{ marginRight: '25px' }}>
							<div className={styles.text}>
								Allocation Ratio
							</div>
							<img
								src="
					https://cogoport-production.sgp1.digitaloceanspaces.com/65f9e0df95910af88bd56d2c371aa159/20%25.png"
								alt="20%"
							/>
						</div>
						<div>
							<div className={styles.text}>
								Fulfillment Ratio
							</div>
							<img
								src="
					https://cogoport-production.sgp1.digitaloceanspaces.com/a14dc433cacc16d5bc1e7e08978821ae/80%25.png"
								alt="80%"
							/>
						</div>
					</div>
					<div className={styles.price_section}>
						<div className={styles.price_text}>
							Buy Rate per Ctr  :
							<span style={{ fontSize: '18px', fontWeight: '600', color: '#4F4F4F' }}>
								USD 18
							</span>
						</div>
						<div className={styles.price_text}>
							Total Buy Price  :
							<span style={{ fontSize: '20px', fontWeight: '700', color: '#221F20' }}>
								USD 370
							</span>
						</div>
					</div>
					<div className={styles.last_section}>
						<div>
							Preferred Service Provider
						</div>
						<div>
							Additional Revert Available
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Card;
