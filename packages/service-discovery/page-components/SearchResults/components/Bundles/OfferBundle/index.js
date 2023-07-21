import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { addDays } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function OfferBundle({ data }) {
	return (
		<div
			className={styles.container}
			style={data.style}
		>
			<span className={styles.tag}>TRANSPORT</span>

			<div className={styles.details_container}>
				<span className={styles.big_text}>{`Upto ${data.discount}% Off on Basic Freight`}</span>

				<span className={styles.small_text}>
					Valid till
					{' '}
					{formatDate({
						date       : addDays(new Date(), data.days),
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
						formatType : 'date',
					})}
					. T&C Apply.
				</span>
			</div>

			<div className={styles.pills_container}>
				<span className={styles.pill}>Origin Transportation</span>
				<span className={styles.pill}>Origin Customs</span>
			</div>
		</div>
	);
}

export default OfferBundle;
