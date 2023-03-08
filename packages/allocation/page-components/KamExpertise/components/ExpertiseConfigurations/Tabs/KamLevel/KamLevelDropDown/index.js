import React from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ action = '', title }) {
	const { listkamLevelDetails } = useKamExpertiseLevelConfig({ title });
	console.log('listkamLevelDetails', listkamLevelDetails);
	return (
		<div className={styles.child}>
			{action === 'show'
				? <KamLevelDetailsShow data={listkamLevelDetails} />
				: <KamLevelDetailsEdit data={listkamLevelDetails} />}
		</div>
	);
}
export default KamLevelDropDown;
