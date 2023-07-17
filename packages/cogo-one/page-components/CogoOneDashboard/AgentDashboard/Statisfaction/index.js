import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { SATIFICATION_IMAGE_MAPPING } from '../../constants';

import styles from './styles.module.css';

function Statisfaction({ loading = false, customerSatisfaction = {} }) {
	return (
		<div className={styles.statisfaction_box}>
			<div className={styles.heading}>User Satisfaction</div>
			{SATIFICATION_IMAGE_MAPPING.map((item) => {
				const { label, key, icon } = item;

				return (
					<div className={styles.sub_section} key={key}>
						<div className={styles.icon_plus_number}>
							<div>{icon}</div>
							{loading
								? <Placeholder width="40px" height="18px" className={styles.placeholder} />
								: (
									<div className={styles.customers_numbers}>
										{customerSatisfaction[key]
								|| GLOBAL_CONSTANTS.zeroth_index}
									</div>
								)}
						</div>
						<div className={styles.customer_type}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}
export default Statisfaction;
