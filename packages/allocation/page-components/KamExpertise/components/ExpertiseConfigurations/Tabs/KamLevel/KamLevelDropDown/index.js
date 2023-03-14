import { React, useState } from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';
import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ refetch, transition_level }) {
	const [editMode, setEditMode] = useState(false);

	const { listkamLevelDetails, listrefetch, listLoading } = useKamExpertiseLevelConfig({ transition_level });

	console.log('listkamLevelDetails', listkamLevelDetails);

	const { formProps, onSave } = useUpdateKamScores({
		transition_level,
		listrefetch,
		setEditMode,
		refetch,
		listkamLevelDetails,
	});
	const { control, handleSubmit, watch } = formProps;

	console.log('watch', watch());

	return (
		<div className={styles.child}>
			{editMode
				? (
					<KamLevelDetailsEdit
						data={listkamLevelDetails}
						control={control}
						handleSubmit={handleSubmit}
						onSave={onSave}
						setEditMode={setEditMode}

					/>
				)
				: (
					<KamLevelDetailsShow
						data={listkamLevelDetails}
						listLoading={listLoading}
						setEditMode={setEditMode}
						transition_level={transition_level}
					/>
				)}
		</div>
	);
}
export default KamLevelDropDown;
