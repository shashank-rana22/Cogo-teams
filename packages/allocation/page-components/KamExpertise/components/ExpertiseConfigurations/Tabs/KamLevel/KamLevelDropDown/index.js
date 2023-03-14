import React from 'react';

import useKamExpertiseLevelConfig from '../../../../../hooks/useKamExpertiseLevelConfig';
import useUpdateKamScores from '../../../../../hooks/useUpdateKamScores';

import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevelDropDown({ editMode, activeCard, setEditMode, refetch }) {
	const { listkamLevelDetails, listrefetch, listLoading } = useKamExpertiseLevelConfig({ activeCard });

	console.log('listkamLevelDetails', listkamLevelDetails);

	const { formProps, onSave } = useUpdateKamScores({
		activeCard,
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
						activeCard={activeCard}
						setEditMode={setEditMode}
					/>
				)}
		</div>
	);
}
export default KamLevelDropDown;
