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
					<div className={styles.heading}>Buy Price</div>
					<div className={styles.sub_heading}>{getBuyPrice(data) || '-'}</div>
				</div>
				{data?.source === 'flashed' && (
					<div>
						<div className={styles.heading}>Min. Price</div>
						<div className={styles.sub_heading}>
							{(data?.service?.is_minimum_price_shipment) ? 'Yes' : 'No'}
						</div>
					</div>
				)}
				{(data?.rate_procurement_proof_url)
				&& (data?.source === 'flashed')
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
