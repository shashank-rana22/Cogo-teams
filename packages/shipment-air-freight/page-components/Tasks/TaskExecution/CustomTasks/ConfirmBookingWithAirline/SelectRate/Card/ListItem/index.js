import { Tooltip, Button } from '@cogoport/components';
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
	createBookingLoading = false,
}) {
	const PROCEED_CTA_LABEL = {
		email              : 'Proceed With Mail',
		e_booking          : 'Place Booking',
		platform           : 'Proceed With Platform',
		email_and_platform : 'Proceed With Platform',
	};

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

				<div>
					<div className={styles.heading}>No of Pkts</div>
					<div className={styles.sub_heading}>{data?.service?.packages_count || '-'}</div>
				</div>

				<div>
					<div className={styles.heading}>Vol. Weight</div>
					<div className={styles.sub_heading}>
						{((data?.service?.volume
							|| DEFAULT_VALUE_FOR_NULL_HANDLING) * VOLUMETRIC_WEIGHT).toFixed(DECIMAL_PLACE)}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Gross Weight</div>
					<div className={styles.sub_heading}>{data?.service?.weight || '-'}</div>
				</div>
				<div>
					<div className={styles.heading}>Commodity</div>
					<div className={styles.sub_heading}>{data?.service?.commodity || '-'}</div>
				</div>
				{data?.service?.commodity_description && (
					<div>
						<div className={styles.heading}>Commodity Description</div>
						<Tooltip
							content={data?.service?.commodity_description}
							placement="top"
						>
							<div className={`${styles.sub_heading} ${styles.secondary_heading}`}>
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
							<div className={`${styles.sub_heading} ${styles.secondary_heading}`}>
								{data?.service?.hs_code}
							</div>
						</Tooltip>
					</div>
				)}
				<div>
					<div className={styles.heading}>Price Type</div>
					<div className={styles.sub_heading}>{startCase(data?.service?.price_type) || '-'}</div>
				</div>
				<div>
					<div className={styles.heading}>Buy Price</div>
					<div className={styles.sub_heading}>{getBuyPrice(data, item.source) || '-'}</div>
				</div>
				{item?.source === 'flash_booking' && (
					<div>
						<div className={styles.heading}>Min. Price</div>
						<div className={styles.sub_heading}>
							{data?.service?.is_minimum_price_shipment ? 'Yes' : 'No'}
						</div>
					</div>
				)}
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
									createBookingLoading || item?.booking_confirmation_status === 'not_booked'
								|| (isEmpty(data?.repository_data) && bookingMode !== 'e_booking')
							}
								onClick={handleSubmit(handleProceed)}
							>
								{PROCEED_CTA_LABEL[bookingMode] || 'Proceed With Platform'}
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ListItem;
