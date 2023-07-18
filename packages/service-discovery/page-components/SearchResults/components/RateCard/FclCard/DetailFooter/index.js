import { Popover } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Detention from '../../../../common/Detention';
import useUpdateDestinationDemurrageDays from '../../../../hooks/useUpdateDestinationDemurrageDays';

import PriceBreakup from './PriceBreakUp';
import RateCardDetails from './RateCardDetails';
import styles from './styles.module.css';

const detailsMapping = ['terms_and_condition', 'price_break_up', 'dnd_details', 'other_details'];

const ADDITIONAL_DAYS_KEYS = ['destination_demurrage', 'origin_detention', 'origin_demurrage', 'destination_detention'];

const detailsComponentMapping = {
	terms_and_condition: {
		key       : 'terms_and_condition',
		label     : 'T&C',
		Component : PriceBreakup,
	},
	price_break_up: {
		key       : 'price_break_up',
		label     : 'Price break up',
		Component : PriceBreakup,
	},
	dnd_details: {
		key       : 'dnd_details',
		label     : 'D&D Fees',
		Component : PriceBreakup,
	},
	other_details: {
		key       : 'other_details',
		label     : 'Other Details',
		Component : PriceBreakup,
	},
};

function DetailFooter({ rateCardData, detail, refetchSearch }) {
	const [showDetails, setShowDetails] = useState('');

	const { onSubmit = () => {} } = useUpdateDestinationDemurrageDays({
		service_rates  : rateCardData?.service_rates,
		spot_search_id : detail?.spot_search_id,
		refetchSearch,
	});

	let addDaysValue = {};

	ADDITIONAL_DAYS_KEYS.forEach((item) => {
		addDaysValue = {
			...addDaysValue,
			[item]: (rateCardData[item]?.free_limit || 0 + rateCardData[item]?.additional_days || 0) || 0,
		};
	});

	const onAddAdditionaldays = (values) => {
		onSubmit(values);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.dndDetails}>
					<span className={styles.tag}>Origin</span>
					DET.
					{' '}
					{rateCardData?.origin_detention?.free_limit || 0}
					{' '}
					days, Demurrage
					{rateCardData?.origin_demurrage?.free_limit || 0}
					{' '}
					days
					<span className={styles.tag}>Destination</span>
					DET.
					{' '}
					{rateCardData?.destination_detention?.free_limit || 0}
					{' '}
					days, Demurrage
					{' '}
					{rateCardData?.destination_demurrage?.free_limit || 0}
					{' '}
					days

					<Popover
						placement="bottom"
						render={(
							<Detention
								heading="Update No. of Free Days"
								buttonTitle="udpate"
								values={addDaysValue}
								handleClick={onAddAdditionaldays}
							/>
						)}
						caret={false}
					>
						<IcMPlusInCircle className={styles.plusIcon} />
					</Popover>

				</div>

				<div className={styles.otherDetails}>
					<div className={styles.wrapper}>
						{detailsMapping.map((item) => (
							<span
								role="presentation"
								key={item}
								className={styles.otherDetailsTag}
								onClick={() => {
									if (showDetails === '') {
										setShowDetails(item);
									} else {
										setShowDetails('');
									}
								}}
							>
								{detailsComponentMapping[item].label}
							</span>
						))}
					</div>
					<div>
						CogoPoints 3000
					</div>
				</div>

			</div>
			{showDetails ? (
				<RateCardDetails
					detailsComponentMapping={detailsComponentMapping}
					rateCardData={rateCardData}
					showDetails={showDetails}
					detail={detail}
				/>
			) : null}
		</>

	);
}

export default DetailFooter;
