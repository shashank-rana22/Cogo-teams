import { RadioGroup, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SailingWeek({
	cogoAssuredOptions = [],
	onChange = () => {},
	selectedCogoAssuredCard = {},
	source = '',
}) {
	return (
		<div className={cl`${styles.container} ${source !== 'banner' && styles.rate_card}`}>
			<div className={styles.heading}>Select Sailing Week</div>

			<div className={styles.radio_group}>
				<RadioGroup
					options={cogoAssuredOptions}
					onChange={onChange}
					value={selectedCogoAssuredCard}
				/>
			</div>
		</div>
	);
}

export default SailingWeek;
