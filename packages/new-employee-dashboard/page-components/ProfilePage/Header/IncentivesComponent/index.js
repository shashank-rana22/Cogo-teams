import React from 'react';

import JoiningBonus from './JoiningBonus';
import RetentionBonus from './RetentionBonus';
import styles from './styles.module.css';

function IncentivesComponent({
	control = {},
	formProps = {},
}) {
	return (
		<div className={styles.container}>
			<JoiningBonus control={control} formProps={formProps} />
			<RetentionBonus control={control} formProps={formProps} />
		</div>
	);
}

export default IncentivesComponent;
