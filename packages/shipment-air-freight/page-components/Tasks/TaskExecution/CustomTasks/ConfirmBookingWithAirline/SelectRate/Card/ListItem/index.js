import { Tooltip, Button } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import getBuyPrice from '../../../utils/getBuyPrice';

import styles from './styles.module.css';

const LIST_PREFERENCE_RATE_STEP = 1;
function ListItem({
	data = {},
	item = {},
	handleSubmit = () => {},
	handleProceed = () => {},
	step = 1,
	bookingMode = '',
}) {
	const { service, price_type, is_minimum_price_system_rate } = data || {};
	const {
		price_type: service_price_type,
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
						{ data?.airline?.business_name || '-'}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Source of Rate</div>
					<div className={styles.sub_heading}>
						{data?.source || '-'}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Price Type</div>
					<div className={styles.sub_heading}>
						{data?.source || '-'}
					</div>
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
					<div className={styles.sub_heading}>
						{startCase(service_price_type || price_type || '-')}
					</div>
				</div>
				<div>
					<div className={styles.heading}>Buy Price</div>
					<div className={styles.sub_heading}>{getBuyPrice(data) || '-'}</div>
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
									data?.rate_procurement_proof_url,
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
