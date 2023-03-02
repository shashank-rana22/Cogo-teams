import React from 'react';

import useKamExpConfigList from '../hooks/useKamExpConfigList';
import KamLevelDetailsEdit from '../KamLevelDetailsEdit';
import KamLevelDetailsShow from '../KamLevelDetailsShow';

import styles from './styles.module.css';

function Children({ action = '', data = {} }) {
	const { listKamConfig, loading = false } = useKamExpConfigList();
	return (

		<div className={styles.child}>
			{action === 'show'
				? <KamLevelDetailsShow data={data} />
				: <KamLevelDetailsEdit data={data} />}
		</div>

	);
}

export default Children;
