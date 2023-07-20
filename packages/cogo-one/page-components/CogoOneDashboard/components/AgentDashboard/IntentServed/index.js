import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { INTENT_SERVED_DATA } from '../../../constants';

import styles from './styles.module.css';

function IntentServed({ loading = false, intentsServed = {} }) {
	return (
		<div className={styles.intent_served_box}>
			<div className={styles.heading}>Intent Served</div>
			{INTENT_SERVED_DATA.map((item) => {
				const { label, key } = item;

				return (
					<div className={styles.sub_section} key={key}>
						{loading
							? <Placeholder width="40px" height="21px" className={styles.placeholder} />
							: (
								<div className={styles.served_intent_numbers}>
									{intentsServed[key]
							|| GLOBAL_CONSTANTS.zeroth_index}
								</div>
							)}
						<div className={styles.intents_served_name}>{label}</div>
					</div>
				);
			})}
		</div>
	);
}
export default IntentServed;
