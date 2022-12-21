import React from 'react';
import { startCase } from '@cogoport/utils';
import RateCard from './RateCard';
import styles from './styles.module.css'

const ratesTypes = {
	existing_inventory: [
		['Single Booking Note to use', 'single_booking_notes'],
		['Merge Booking Note', 'mergeable_booking_notes'],
		['Split Booking Note', 'splitable_booking_notes'],
	],
};
const ExistingRates = ({
	type,
	data,
	prefrences,
	setPrefrences = () => {},
	expanded,
}) => {
	const getHeading = () => {
		let heading = '';
		type.split('_').forEach((element) => {
			heading += `${startCase(element)} `;
		});
		return heading;
	};

	return (
		<div>
			<div className = {styles.heading}>{getHeading()}</div>

			{(ratesTypes[type] || []).map((sub_type) => (
				<RateCard
					expanded={expanded}
					prefrences={prefrences}
					setPrefrences={setPrefrences}
					type={sub_type[0]}
					objectkey={sub_type[1]}
					details={data?.docs}
				/>
			))}
		</div>
	);
};

export default ExistingRates;