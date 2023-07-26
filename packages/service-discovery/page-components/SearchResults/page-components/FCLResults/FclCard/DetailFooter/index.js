import { Popover } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
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

const ZERO = 0;

function DetailFooter({ rateCardData, detail, refetchSearch, isCogoAssured }) {
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
			[item]: (rateCardData[item]?.free_limit || ZERO + rateCardData[item]?.additional_days || ZERO) || ZERO,
		};
	});

	const {
		origin_detention = {},
		origin_demurrage = {},
		destination_detention = {},
		destination_demurrage = {},
	} = rateCardData;

	const howMuchToShowInDnD = {
		origin_detention      : origin_detention?.slabs && !isEmpty(origin_detention.slabs),
		origin_demurrage      : origin_demurrage?.slabs && !isEmpty(origin_demurrage.slabs),
		destination_detention : destination_detention?.slabs && !isEmpty(destination_detention.slabs),
		destination_demurrage : destination_demurrage?.slabs && !isEmpty(destination_demurrage.slabs),
	};

	const notToShowDnD = Object.values(howMuchToShowInDnD).every((val) => {
		if (!val) {
			return true;
		}
		return false;
	});

	const onAddAdditionaldays = (values) => {
		onSubmit(values);
	};

	const templateStyles = isCogoAssured ? styles.cogo_assured : {};

	return (
		<>
			<div className={`${styles.container} ${templateStyles}`}>
				<div className={styles.dndDetails}>
					<span className={styles.tag}>Origin</span>
					DET.
					{' '}
					{rateCardData?.origin_detention?.free_limit || ZERO}
					{' '}
					days, Demurrage
					{rateCardData?.origin_demurrage?.free_limit || ZERO}
					{' '}
					days
					<span className={styles.tag}>Destination</span>
					DET.
					{' '}
					{rateCardData?.destination_detention?.free_limit || ZERO}
					{' '}
					days, Demurrage
					{' '}
					{rateCardData?.destination_demurrage?.free_limit || ZERO}
					{' '}
					days

					{notToShowDnD ? null : (
						<Popover
							placement="bottom"
							render={(
								<Detention
									howMuchToShowInDnD={howMuchToShowInDnD}
									heading="Update No. of Free Days"
									buttonTitle="Update"
									values={addDaysValue}
									handleSave={onAddAdditionaldays}
								/>
							)}
							caret={false}
						>
							<IcMPlusInCircle className={styles.plusIcon} />
						</Popover>
					)}

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
