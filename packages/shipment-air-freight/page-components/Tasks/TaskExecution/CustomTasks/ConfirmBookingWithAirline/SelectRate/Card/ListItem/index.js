import { Tooltip, Button, cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import getBuyPrice from '../../../utils/getBuyPrice';

import styles from './styles.module.css';

const VOLUMETRIC_WEIGHT = 166.67;
const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const DECIMAL_PLACE = 2;
const LIST_PREFERENCE_RATE_STEP = 1;
function ListItem({
	data = {},
	item = {},
	handleSubmit = () => {},
	handleProceed = () => {},
	step = 1,
	bookingMode = '',
}) {
	const { service, volume, weight, commodity, price_type, is_minimum_price_system_rate } = data || {};
	const {
		weight: service_weight,
		volume: service_volume,
		commodity: service_commodity,
		price_type: service_price_type,
		packages_count: service_packages_count,
		is_minimum_price_shipment: service_is_minimum_price_shipment,
	} = service || {};
	return (
		<div className={styles.body}>
			<div className={styles.space_between}>
				<div className={styles.item}>
					<div className={styles.heading}>Service Provider</div>
					<Tooltip
						content={data?.service_provider?.business_name || '-'}
						placement="top"
					>
						<div className={styles.item_body}>{data?.service_provider?.business_name || '-'}</div>
					</Tooltip>
				</div>
				<div>
					<div className={styles.heading}>Airline</div>
					<div className={styles.sub_heading}>
						{item?.source === 'system_rate'
							? data?.airline?.business_name || '-'
							: data?.reverted_airline?.business_name || '-'}
					</div>
				</div>
				{item?.source === 'flash_booking' && (
					<div>
						<div className={styles.heading}>No of Pkts</div>
						<div className={styles.sub_heading}>{service_packages_count || '-'}</div>
					</div>
				)}

				<div>
					<div className={styles.heading}>Vol. Weight</div>
					<div className={styles.sub_heading}>
						{((service_volume || volume
							|| DEFAULT_VALUE_FOR_NULL_HANDLING) * VOLUMETRIC_WEIGHT).toFixed(DECIMAL_PLACE)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Gross Weight</div>
					<div className={styles.sub_heading}>{service_weight || weight || '-'}</div>
				</div>
				<div>
					<div className={styles.heading}>Commodity</div>
					<div className={styles.sub_heading}>
						{startCase(service_commodity || commodity || '-')}
					</div>
				</div>
				{data?.service?.commodity_description && (
					<div>
						<div className={styles.heading}>Commodity Description</div>
						<Tooltip
							content={data?.service?.commodity_description}
							placement="top"
						>
							<div className={cl`${styles.sub_heading} ${styles.secondary_heading}`}>
								{data?.service?.commodity_description}
							</div>
						</Tooltip>
					</div>
				)}
				{data?.service?.hs_code &&	(
					<div>
						<div className={styles.heading}>HS Code</div>
						<Tooltip
							content={data?.service?.hs_code}
							placement="top"
						>
							<div className={cl`${styles.sub_heading} ${styles.secondary_heading}`}>
								{data?.service?.hs_code}
							</div>
						</Tooltip>
					</div>
				)}
				<div>
					<div className={styles.heading}>Price Type</div>
					<div className={styles.sub_heading}>
						{startCase(service_price_type || price_type || '-')}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Buy Price</div>
					<div className={styles.sub_heading}>{getBuyPrice(data, item.source) || '-'}</div>
				</div>
				<div>
					<div className={styles.heading}>Min. Price</div>
					<div className={styles.sub_heading}>
						{ is_minimum_price_system_rate || service_is_minimum_price_shipment ? 'Yes' : 'No'}
					</div>
				</div>
				{data?.data?.rate_procurement_proof_url
				&& item?.source === 'flash_booking'
				&& (
					<div>
						<div className={styles.heading}>Rate Proof</div>
						<div className={styles.sub_heading}>
							<Button
								themeType="linkUi"
								size="md"
								onClick={() => window.open(
									data?.data?.rate_procurement_proof_url,
									'_blank',
								)}
							>
								view
							</Button>
						</div>
					</div>
				)}
			</div>
			<div className={styles.message_container}>
				{step === LIST_PREFERENCE_RATE_STEP && (
					<>
						{item?.booking_confirmation_status === 'not_booked' && (
							<div className={styles.message}>
								<div className={styles.reason_container}>
									<div className={styles.heading}>Status: </div>
									<div className={styles.reason}>
										{startCase(item.booking_confirmation_status)}
									</div>
								</div>
								<div className={styles.reason_container}>
									<div className={styles.heading}>Reason: </div>
									<div className={styles.reason}>
										{startCase(item?.booking_not_placed_reason || '-')}
									</div>
								</div>
							</div>
						)}
						<div className={styles.button_wrap}>
							<Button
								className="secondary sm"
								disabled={
								item?.booking_confirmation_status === 'not_booked'
								|| isEmpty(data?.repository_data)
							}
								onClick={handleSubmit(handleProceed)}
							>
								{bookingMode === 'email'
									? 'Proceed With Mail'
									: 'Proceed With Platform'}
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ListItem;
