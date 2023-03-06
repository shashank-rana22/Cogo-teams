import React from 'react';

import useKamExpertiseLevelConfig from '../hooks/useKamExpertiseLevelConfig';
import KamLevelDetailsEdit from '../KamLevelDetailsEdit';
import KamLevelDetailsShow from '../KamLevelDetailsShow';

import styles from './styles.module.css';

function Children({ action = '', data }) {
	return (
		<div className={styles.child}>
			{action === 'show'
				? <KamLevelDetailsShow data={data} />
				: <KamLevelDetailsEdit data={data} />}
		</div>
	);
}

export default Children;
