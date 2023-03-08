import React from 'react';

import useKamExpertiseLevelConfig from '../hooks/useKamExpertiseLevelConfig';
import KamLevelDetailsEdit from '../KamLevelDetailsEdit';
import KamLevelDetailsShow from '../KamLevelDetailsShow';

import styles from './styles.module.css';

function Children({ action = '', title }) {
	const { listkamLevelDetails } = useKamExpertiseLevelConfig({ title });

	console.log('hello', listkamLevelDetails);

	return (
		<div className={styles.child}>
			{action === 'show'
				? <KamLevelDetailsShow data={listkamLevelDetails} />
				: <KamLevelDetailsEdit data={listkamLevelDetails} />}
		</div>
	);
}

export default Children;
