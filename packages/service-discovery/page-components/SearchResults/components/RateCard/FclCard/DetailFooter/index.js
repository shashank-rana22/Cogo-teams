import { IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import PriceBreakup from './PriceBreakUp';
import RateCardDetails from './RateCardDetails';
import styles from './styles.module.css';

const detailsMapping = ['terms_and_condition', 'price_break_up', 'dnd_details', 'other_details'];

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

function DetailFooter({ rateCardData, detail }) {
	const [showDetails, setShowDetails] = useState('');

	return (
		<>
			<div className={styles.container}>
				<div className={styles.dndDetails}>
					<span className={styles.tag}>Origin</span>
					DET. 7 days, Demurrage 3 days
					<span className={styles.tag}>Destination</span>
					DET. 7 days, Demurrage 3 days

					<IcMPlusInCircle className={styles.plusIcon} />
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
