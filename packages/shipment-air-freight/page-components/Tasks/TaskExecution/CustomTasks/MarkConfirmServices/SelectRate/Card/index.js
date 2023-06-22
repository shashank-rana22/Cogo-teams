import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import useUpdateBookingPreferences
	from '../../../../../../../hooks/useUpdateBookingPreferences';

import styles from './styles.module.css';

const CONFIRM_RATE_STEP = 2;
const getBuyPrice = (dataObj, source) => {
	if (source === 'system_rate') {
		const firstvalidty = dataObj?.validities?.[GLOBAL_CONSTANTS.zeroth_index] || {};
		const price = firstvalidty?.price || firstvalidty?.min_price;
		const currency = dataObj?.validities?.[GLOBAL_CONSTANTS.zeroth_index]?.currency;

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
	priority,
	setStep = () => {},
	setSelectedCard = () => {},
	serviceProvidersData = [],
	task = {},
}) {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	const { apiTrigger, loading } = useUpdateBookingPreferences({});

	const keysForArr = useMemo(
		() => Array(dataArr.length).fill(null).map(() => Math.random()),
		[dataArr.length],
	);

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
						{`${startCase(item.source)} Booking Note`}
					</div>
				</div>
			</div>

			<div className={styles.body}>
				{(dataArr || []).map((dataObj, index) => (
					<div className={styles.space_between} key={keysForArr[index]}>
						<div>
							<div className={styles.heading}>Supplier Name</div>

							<div className={styles.sub_heading}>
								{dataObj?.service_provider?.business_name}
							</div>
						</div>
						<div>
							<div className={styles.heading}>Airline</div>
							<div className={styles.sub_heading}>
								{item?.source === 'system_rate'
									? dataObj?.airline?.business_name || '-'
									: dataObj?.reverted_airline?.business_name || '-'}
							</div>
						</div>
						{item?.source === 'flash_booking' && task?.service_type === 'air_freight_service' && (
							<>
								<div>
									<div className={styles.heading}>Chargeable Wt.</div>
									<div className={styles.sub_heading}>
										{`${
											dataObj?.data?.chargeable_weight
													|| dataObj?.service?.chargeable_weight
													|| '--'
										} Kg`}
									</div>
								</div>
								<div>
									<div className={styles.heading}>Price Type</div>
									<div className={styles.sub_heading}>
										{startCase(dataObj?.data?.price_type) || '--'}
									</div>
								</div>
								<div>
									<div className={styles.heading}>Min. Price</div>
									<div className={styles.sub_heading}>
										{dataObj?.service?.is_minimum_price_shipment
											? 'Yes'
											: 'No'}
									</div>
								</div>
							</>
						)}

						<div>
							<div className={styles.heading}>Source of Rate</div>

							<div className={styles.sub_heading}>{startCase(item?.source)}</div>
						</div>

						<div>
							<div className={styles.heading}>Buy Rate</div>

							<div className={styles.sub_heading}>{getBuyPrice(dataObj, item.source)}</div>
						</div>

						{dataObj?.data?.rate_procurement_proof_url
						&& item?.source === 'flash_booking' && (
							<div>
								<div className={styles.heading}>Rate Procurement Proof</div>
								<div className={styles.sub_heading}>
									<Button
										themeType="linkUi"
										size="md"
										onClick={() => window.open(
											dataObj?.data?.rate_procurement_proof_url,
											'_blank',
										)}
									>
										view
									</Button>
								</div>
							</div>
						)}

					</div>

				))}

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
