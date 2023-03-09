import React from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ editMode, title }) {
	const { listkamLevelDetails } = useKamExpertiseLevelConfig({ title });
	// console.log('listkamLevelDetails', listkamLevelDetails);
	return (
		<div className={styles.child}>
			{editMode
				? <KamLevelDetailsEdit data={listkamLevelDetails} />
				: <KamLevelDetailsShow data={listkamLevelDetails} />}
		</div>
	);
}
export default KamLevelDropDown;
