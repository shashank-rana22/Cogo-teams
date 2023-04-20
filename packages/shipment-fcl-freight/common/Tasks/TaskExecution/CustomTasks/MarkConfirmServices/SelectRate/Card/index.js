import { startCase } from '@cogoport//utils';
import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const getBuyPrice = (dataObj, source) => {
	if (source === 'system_rate') {
		const firstvalidty = dataObj?.validities?.[0] || {};
		const price = firstvalidty?.price || firstvalidty.min_price;
		const currency = dataObj?.validities?.[0].currency;
		return `${currency} ${price}`;
	}

	if (source === 'flash_booking') {
		const price = dataObj?.line_items?.[0]?.price;
		const currency = dataObj?.line_items?.[0]?.currency;
		return `${currency} ${price}`;
	}

	const price = dataObj?.charges?.line_items?.[0]?.price;
	const currency = dataObj?.charges?.line_items?.[0]?.currency;
	return `${currency} ${price}`;
};

function Card({
	item,
	priority,
	setStep,
	setSelectedCard,
	updateConfirmation,
}) {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	const handleProceed = async () => {
		// await updateConfirmation(item);
		setSelectedCard(item);
		setStep(2);
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
					<div className={styles.priority_text} className="purple">
						{`${startCase(item.source)} Booking Note`}
					</div>
				</div>
			</div>
			<div className={styles.body}>
				{(dataArr || []).map((dataObj) => (
					<div className={styles.space_between}>
						<div>
							<div className={styles.heading}>Supplier Name</div>
							<div className={styles.sub_heading}>
								{dataObj?.service_provider?.business_name}
							</div>
						</div>
						{dataObj?.airline?.business_name ? (
							<div>
								<div className={styles.heading}>Carrier</div>
								<div className={styles.sub_heading}>
									{dataObj?.operator?.business_name
											|| dataObj?.airline?.business_name}
								</div>
							</div>
						) : null}
						<div>
							<div className={styles.heading}>Source of Rate</div>
							<div className={styles.sub_heading}>{startCase(item?.source)}</div>
						</div>
						<div>
							<div className={styles.heading}>Buy Rate</div>
							<div className={styles.sub_heading}>{getBuyPrice(dataObj, item.source)}</div>
						</div>
						<div>
							<div className={styles.heading}>Sailing Date</div>
							<div className={styles.sub_heading}>
								{formatDate({
									date       : new Date(),
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</div>
						</div>
					</div>
				))}
				<div className={styles.button_wrap}>
					<Button
						onClick={() => {
							handleProceed();
						}}
					>
						Proceed
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Card;
