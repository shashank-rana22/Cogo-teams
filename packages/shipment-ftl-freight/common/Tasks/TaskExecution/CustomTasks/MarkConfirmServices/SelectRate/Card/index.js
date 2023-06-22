import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import useUpdateBookingPreferences
	from '../../../../../../../hooks/useUpdateBookingPreferences';

import styles from './styles.module.css';

const STEP_VALUE = 2;
const FIRST_INDEX = 0;

const getBuyPrice = (dataObj, source) => {
	if (source === 'system_rate') {
		const firstvalidty = dataObj?.validities?.[FIRST_INDEX] || {};
		const price = firstvalidty?.price || firstvalidty.min_price;
		const currency = dataObj?.validities?.[FIRST_INDEX].currency;

		return `${currency} ${price}`;
	}

	if (source === 'flash_booking') {
		const price = dataObj?.line_items?.[FIRST_INDEX]?.price;
		const currency = dataObj?.line_items?.[FIRST_INDEX]?.currency;

		return `${currency} ${price}`;
	}

	const price = dataObj?.charges?.line_items?.[FIRST_INDEX]?.price;
	const currency = dataObj?.charges?.line_items?.[FIRST_INDEX]?.currency;

	return `${currency} ${price}`;
};

function Card({
	item = {},
	priority,
	setStep = () => {},
	setSelectedCard = () => {},
}) {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	const { apiTrigger, loading } = useUpdateBookingPreferences({});

	const keysForArr = useMemo(
		() => Array(dataArr.length).fill(null).map(() => Math.random()),
		[dataArr.length],
	);

	const handleProceed = async () => {
		await apiTrigger(item);

		setSelectedCard(item);

		setStep(STEP_VALUE);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.row}>
					<div className={styles.priority_text}>
						(
						{priority}
						&nbsp;
						Priority)
						&nbsp;
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
