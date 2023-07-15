import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useUpdateShipmentBookingConfirmationPreferences
	from '../../../../../../../hooks/useUpdateShipmentBookingConfirmationPreferences';

import styles from './styles.module.css';

const getBuyPrice = (dataObj) => {
	const price = dataObj?.price;
	const currency = dataObj?.currency;

	return formatAmount({
		amount  : price,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});
};

function Card({
	item = {},
	priority,
	setStep = () => {},
	setSelectedCard = () => {},
	similarServiceIds = [],
	selectedCard = [],
	step = 1,
}) {
	const ONE = 1;
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	const { apiTrigger, loading } = useUpdateShipmentBookingConfirmationPreferences({ setStep });

	const handleProceed = async () => {
		setSelectedCard([...selectedCard, item]);
	};

	const payload = JSON.stringify(selectedCard);

	const SIMILAR_LENGTH = similarServiceIds.length;

	useEffect(() => {
		if (selectedCard.length === SIMILAR_LENGTH && step === ONE) {
			apiTrigger(selectedCard);
		}
	}, [payload, selectedCard, SIMILAR_LENGTH, step, setStep, apiTrigger]);

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
						{`${startCase(dataArr?.[GLOBAL_CONSTANTS.zeroth_index]?.source)} Booking Note`}
					</div>
				</div>
			</div>

			<div className={styles.body}>
				{(dataArr || []).map((dataObj) => (
					<div key={dataObj?.service_provider?.business_name} className={styles.space_between}>
						<div>
							<div className={styles.heading}>Supplier Name</div>

							<div className={styles.sub_heading}>
								{dataObj?.service_provider?.business_name}
							</div>
						</div>

						<div>
							<div className={styles.heading}>Source of Rate</div>

							<div className={styles.sub_heading}>
								{startCase(dataArr?.[GLOBAL_CONSTANTS.zeroth_index]?.source)}
							</div>
						</div>

						<div>
							<div className={styles.heading}>Buy Rate</div>

							<div className={styles.sub_heading}>{getBuyPrice(dataObj)}</div>
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
						disabled={loading
							|| (selectedCard || []).find((service) => item.service_id === service.service_id)}
					>
						{selectedCard.length
						=== (similarServiceIds.length - ONE) ? 'Proceed' : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Card;
