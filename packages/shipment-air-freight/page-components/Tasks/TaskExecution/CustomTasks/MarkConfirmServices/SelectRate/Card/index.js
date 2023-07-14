import { Button, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import useUpdateBookingPreferences
	from '../../../../../../../hooks/useUpdateBookingPreferences';

import styles from './styles.module.css';

const CONFIRM_RATE_STEP = 2;
const PRIORITY_DEFAULT = 1;
const getBuyPrice = (dataObj, source) => {
	if (source === 'system_rate') {
		const firstValidty = (dataObj?.validities || dataObj?.line_items)?.[GLOBAL_CONSTANTS.zeroth_index] || {};
		const price = firstValidty?.price || firstValidty?.min_price || '--';
		const currency = firstValidty?.currency || '--';

		return `${currency} ${price}`;
	}

	if (source === 'flash_booking') {
		const price = dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.price;
		const currency = dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.currency;

		return `${currency} ${price}`;
	}

	const price = dataObj?.charges?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.price;
	const currency = dataObj?.charges?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.currency;

	return `${currency} ${price}`;
};

function Card({
	item = {},
	priority = PRIORITY_DEFAULT,
	setStep = () => {},
	setSelectedCard = () => {},
	serviceProvidersData = [],
	task = {},
}) {
	const { data, source } = item;
	const dataArr = Array.isArray(data) ? data : [data];

	const { apiTrigger, loading } = useUpdateBookingPreferences({});

	const handleProceed = async () => {
		const service_providers = serviceProvidersData;
		await apiTrigger(item, service_providers);

		setSelectedCard(item);

		setStep(CONFIRM_RATE_STEP);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.row}>
					<div className={styles.priority_text}>
						(
						{priority}
						{' '}
						Priority)
						{' '}
					</div>

					<div className={styles.priority_text}>
						{`${startCase(source)} Booking Note`}
					</div>
				</div>
			</div>

			<div className={styles.body}>
				{(dataArr || []).map((dataObj) => {
					const {
						chargeable_weight: dataChargeableWeight,
						price_type,
						rate_procurement_proof_url,
					} = dataObj?.data || dataObj || {};
					const {
						hs_code,
						commodity_description,
						chargeable_weight,
						is_minimum_price_shipment,
					} = dataObj?.service || {};
					return (
						<div className={styles.space_between} key={dataObj?.id}>
							<div>
								<div className={styles.heading}>Supplier Name</div>
								<Tooltip
									content={dataObj?.service_provider?.business_name}
									placement="top"
								>
									<div className={cl`${styles.sub_heading} ${styles.secondary_heading}`}>
										{dataObj?.service_provider?.business_name}
									</div>
								</Tooltip>
							</div>
							<div>
								<div className={styles.heading}>Airline</div>
								<div className={styles.sub_heading}>
									{source === 'system_rate'
										? dataObj?.airline?.business_name || '-'
										: dataObj?.reverted_airline?.business_name || '-'}
								</div>
							</div>
							{task?.service_type === 'air_freight_service' && (
								<>
									<div>
										<div className={styles.heading}>Chargeable Wt.</div>
										<div className={styles.sub_heading}>
											{`${
												dataChargeableWeight
													|| data?.[GLOBAL_CONSTANTS.zeroth_index]?.chargeable_weight
													|| chargeable_weight
														|| '--'
											} Kg`}
										</div>
									</div>
									{commodity_description && (
										<div>
											<div className={styles.heading}>Commodity Desc.</div>
											<Tooltip
												content={commodity_description}
												placement="top"
											>
												<div className={cl`${styles.sub_heading} ${styles.secondary_heading}`}>
													{commodity_description}
												</div>
											</Tooltip>
										</div>
									)}
									{hs_code &&	(
										<div>
											<div className={styles.heading}>HS Code</div>
											<Tooltip
												content={hs_code}
												placement="top"
											>
												<div className={cl`${styles.sub_heading} ${styles.secondary_heading}`}>
													{hs_code}
												</div>
											</Tooltip>
										</div>
									)}
									<div>
										<div className={styles.heading}>Price Type</div>
										<div className={styles.sub_heading}>
											{startCase(price_type) || '--'}
										</div>
									</div>
									<div>
										<div className={styles.heading}>Min. Price</div>
										<div className={styles.sub_heading}>
											{data?.[GLOBAL_CONSTANTS.zeroth_index]?.is_minimum_price_system_rate
											|| is_minimum_price_shipment
												? 'Yes'
												: 'No'}
										</div>
									</div>
								</>
							)}

							<div>
								<div className={styles.heading}>Source of Rate</div>

								<div className={styles.sub_heading}>{startCase(source)}</div>
							</div>

							<div>
								<div className={styles.heading}>Buy Rate</div>

								<div className={styles.sub_heading}>{getBuyPrice(dataObj, source)}</div>
							</div>

							{rate_procurement_proof_url
						&& source === 'flash_booking' && (
							<div>
								<div className={styles.heading}>Rate Procurement Proof</div>
								<div className={styles.sub_heading}>
									<Button
										themeType="linkUi"
										size="md"
										onClick={() => window.open(
											rate_procurement_proof_url,
											'_blank',
										)}
									>
										view
									</Button>
								</div>
							</div>
							)}

						</div>

					);
				})}

				<div className={styles.button_wrap}>
					<Button
						onClick={() => handleProceed()}
						disabled={loading}
					>
						Proceed
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Card;
